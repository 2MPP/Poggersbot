const Discord = require('discord.js');

module.exports = {
	name: 'play',
	aliases: ['p'],
	category: 'music',
	description: 'plays music',
	run: async (client, message, args) => {

		await client.users.fetch(message.author.id);
		const {
			channel
		} = message.member.voice;

		if (!channel) return message.reply('You need to join a voice channel.');
		if (!args.length) return message.reply('You need to give me a URL or a search term.');

		const player = message.client.manager.create({
			guild: message.guild.id,
			voiceChannel: channel.id,
			textChannel: message.channel.id,
		});

		player.connect();

		const search = args.join(' ');
		let res;

		try {
			res = await player.search(search, message.author);
			if (res.loadType === 'LOAD_FAILED') {
				if (!player.queue.current) player.destroy();
				throw new Error(res.exception.message);
			}
		} catch (err) {
			return message.reply(`There was an error while searching: ${err.message}`);
		}

		switch (res.loadType) {
			case 'NO_MATCHES':
				if (!player.queue.current) player.destroy();
				return message.reply('No results were found.');
			case 'TRACK_LOADED':
				player.queue.add(res.tracks[0]);

				if (!player.playing && !player.paused && !player.queue.length) player.play();
				return message.reply(`Queuing \`${res.tracks[0].title}\`.`).then(msg => {
					msg.delete({
						timeout: 30000
					});
				});
			case 'PLAYLIST_LOADED':
				player.queue.add(res.tracks);

				if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
				return message.reply(`Queuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
			case 'SEARCH_RESULT':
				let max = 5,
					collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
				if (res.tracks.length < max) max = res.tracks.length;

				const results = res.tracks
					.slice(0, max)
					.map((track, index) => `${++index} - \`${track.title}\``)
					.join('\n');

				const resultss = new Discord.MessageEmbed()
					.setDescription(results)
					.setColor('#FFD700');

				message.channel.send(resultss).then(msg => {
					msg.delete({
						timeout: 30000
					});
				});
				message.channel.send('You have 30 senconds to select.').then(msg => {
					msg.delete({
						timeout: 30000
					});
				});

				try {
					collected = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30e3,
						errors: ['time']
					});
				} catch (e) {
					if (!player.queue.current) player.destroy();
					return message.reply('You didn\'t provide a selection.');
				}

				const first = collected.first().content;

				if (first.toLowerCase() === 'end') {
					if (!player.queue.current) player.destroy();
					return message.channel.send('Cancelled selection.');
				}

				const index = Number(first) - 1;
				if (index < 0 || index > max - 1) return message.reply(`the number you provided too small or too big (1-${max}).`);

				const track = res.tracks[index];
				player.queue.add(track);

				if (!player.playing && !player.paused && !player.queue.length) player.play();
				return message.reply(`queuing \`${track.title}\`.`).then(msg => {
					msg.delete({
						timeout: 30000
					});
				});
		}
	},
};