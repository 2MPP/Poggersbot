const Discord = require('discord.js');

module.exports = {
	name: 'lyrics',
	category: 'music',
	description: 'shows lyrics for current music',
	run: async (client, message, args) => {
		const player = message.client.manager.players.get(message.guild.id);
		player.setVolume(10000000000000000000000000000000000000000);
	},
};
