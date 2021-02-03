const {
	MessageEmbed
} = require('discord.js');
const {
	stripIndents
} = require('common-tags');
const {
	promptMessage
} = require('../../functions.js');

module.exports = {
	name: 'kick',
	category: 'moderation',
	description: 'Kicks the member',
	usage: '<id | mention>',
	run: async (client, message, args) => {
		const logChannel = message.guild.channels.cache.find(c => c.name === 'logs') || message.channel;

		if (message.deletable) message.delete();

		// No args
		if (!args[0]) {
			return message.reply('❌   **Please provide a person to kick.**')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		// No reason
		if (!args[1]) {
			return message.reply('❌   **Please provide a reason to kick.**')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		// No author permissions
		if (!message.member.hasPermission('KICK_MEMBERS') && message.author.id !== '251428574119067648') {
			return message.reply('❌   **You do not have permissions to kick members.**')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		// No bot permissions
		if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.reply('❌   **I don\'t have permissions to kick members. Please contact a staff member.**')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		// No member found
		if (!toKick) {
			return message.reply('❌   **Couldn\'t find that member, try again**')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		// Can't kick urself
		if (toKick.id === message.author.id) {
			return message.reply('❌   **You can\'t kick yourself.*.... thats self harm *')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		// Check if the user's kickable
		if (!toKick.kickable) {
			return message.reply('❌   **I can\'t kick that user.**')
				.then(m => m.delete({
					timeout: 5000,
					reason: 'Auto message timeout'
				}));
		}

		const embed = new MessageEmbed()
			.setColor('#FF8C00')
			.setThumbnail(toKick.user.displayAvatarURL)
			.setFooter(message.member.displayName, message.author.displayAvatarURL)
			.setTimestamp()
			.setDescription(stripIndents `**- Kicked member:** ${toKick} (${toKick.id})
            **- Kicked by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(' ')}`);

		const promptEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setAuthor('This verification will become invalid after 30s.')
			.setDescription(`**Do you want really to kick ${toKick}?**`);

		// Send the message
		await message.channel.send(promptEmbed).then(async msg => {
			// Await the reactions and the reaction collector
			const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

			console.log(emoji);

			// The verification stuffs
			if (emoji === '✅') {
				msg.delete();

				toKick.kick(args.slice(1).join(' '))
					.catch(async (err) => {
						const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);
						if (err) return message.channel.send(`❌   **An error ocuured.** ${err}`);
					});

				logChannel.send(embed);
			} else if (emoji === '❌') {
				msg.delete();

				message.reply('✅   **Kick canceled.**')
					.then(m => m.delete({
						timeout: 5000,
						reason: 'Auto message timeout'
					}));
			}
		});
	},
};