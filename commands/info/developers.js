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
                {name: 'Owner', value: '2mp#0002'},
                {name: 'Co-Owner', value: 'curry#6969'},
            )

        message.channel.send(embed)
	},
};