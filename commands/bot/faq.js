const Discord = require('discord.js');
module.exports = {
	name: 'faq',
	category: 'bot',
	description: 'Suggests command to 2MP',
	run: async (client, message, args) => {

		const faq = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.addFields(
				{ name: 'Q: Were is your bot hosted', value: 'A: I host my bot on my old android phone' },
				{ name: 'Q: Why do you host it on your phone', value: 'A: Because i can' },
				{ name: '\u200B', value: 'Still have any questions feel free to dm me ``2MP#3227``' },
			);

		message.channel.send(faq);
	},
};