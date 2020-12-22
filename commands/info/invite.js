const Discord = require('discord.js');


module.exports = {
	name: 'invite',
	usage: '<id | mention>',
	category: 'info',
	description: 'infomation for the bot',
	run: async (client, message, args) => {
		const embed = new Discord.MessageEmbed()

			.setTitle('**Click here to invite!**')
			.setURL('https://discordapp.com/oauth2/authorize?client_id=778411215470067732&scope=bot&permissions=8')
			.setDescription('Need help dm me 2MP#6384 or curry#4094')
			.setColor('RED');

		message.channel.send(embed);

	},
};