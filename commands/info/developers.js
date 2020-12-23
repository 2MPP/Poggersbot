const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'developers',
	aliases: [],
	category: 'info',
	description: 'Shows the owners of poggers bot!',
	usage: '<input>',
	run: async (client, message, args) => {
		const cu = await client.users.fetch('405771597761216522')
		const mp = await client.users.fetch('251428574119067648')

		const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Developers')
            .addFields(
                {name: 'Owner', value: mp.tag},
				{name: 'Co-Owner', value: cu.tag},
				{name: '\u200B', value: '2MP is the main developer for Poggers Bot, he has done majority of the code. \n Meanwhile, curry is open at all times for support and corrects capital letters because 2MP always forgets.'}
			)

        message.channel.send(embed)
	},
};