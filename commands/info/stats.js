const Discord = require('discord.js');
const memory = require('memory');


module.exports = {
	name: 'stats',
	category: 'info',
	description: 'infomation for the bot',
	run: async (client, message, args) => {
		const users = client.users.cache.size;
		const servers = client.guilds.cache.size;
		const ping = Math.round(client.ws.ping);
		const mb = memory();

		const stats = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.addFields(
				{ name: 'Cached members', value: users },
				{ name: 'Servers', value: servers },
				{ name: 'Ping', value: ping },
				{ name: 'Ram Usage', value: mb + 'MB' },
			);
		message.channel.send(stats);
	},
};