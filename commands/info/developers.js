const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'developers',
	aliases: [],
	category: 'info',
	description: 'Shows the owners of poggers bot!',
	usage: '<input>',
	run: (client, message) => {
		const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Developers')
            .addFields(
                {name: 'Owner', value: '2MP#0002'},
				{name: 'Co-Owner', value: 'curry#6969'},
				{name: '\u200B', value: '2MP is the main developer for Poggers Bot, he has done majority of the code. \n Meanwhile, curry is open at all times for support and corrects capital letters because 2MP always forgets.'}
			)

        message.channel.send(embed)
	},
};