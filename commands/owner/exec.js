const exec = require('child_process').exec;
const Discord = require('discord.js')
module.exports = {
	name: 'exec',
	aliases: [],
	category: 'owner',
	description: 'Run some exec code',
	usage: '<input>',
	run: (client, message, args) => {
		if (message.author.id !== '251428574119067648') {
			return message.channel.send('Only my owner can use this.');
		}

		const start = process.hrtime();

		exec(`${args.join(' ')}`, (error, stdout) => {

			let response = (error || stdout);

			if (response.length > 1024) console.log(response), response = 'Output too long.';
			const end = process.hrtime(start);

			message.channel.send('', {
				embed: new Discord.MessageEmbed()
					.setDescription('```' + response + '```')
                    .setTimestamp()
                    .setFooter(`Time taken: ${Date.now() - message.createdTimestamp} ms`)
					.setColor('RANDOM'),
			});

		});

	},
};
