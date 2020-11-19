const Discord = require('discord.js');
module.exports = {
	name: 'commandsuggest',
	category: 'bot',
	description: 'Suggests command to 2MP',
	run: async (client, message, args) => {
		const args2 = args.slice(0).join(' ');
		if (args2 < 1) return message.channel.send(' <:thonk:715915147373182987> Please Say something to suggest').then(m => m.delete(5000));
		message.channel.send('Thanks for the suggestion').then(m => m.delete({ timeout: 5000, reason: 'Auto message timeout' }));

		const dan = new Discord.MessageEmbed()
			.setColor('#800080')
			.setTitle('**New Suggestion**')
			.setDescription(`User: ${message.author.username} \n Suggestion: \n **${args2}**`);
		client.users.fetch('251428574119067648', false).then(user => {
			user.send(dan);
		});
	},
};