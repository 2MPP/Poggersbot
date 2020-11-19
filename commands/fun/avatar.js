const MessageAttachment = require('discord.js');
const Discord = require('discord.js');


module.exports = {
    name: "avatar",
    category: "fun",
    description: "sends your mentioned user or your profile pic",
    run: async (client, message) => {
		const user = message.mentions.users.first()

		if(!user) {
			const embed = new Discord.MessageEmbed()
			.setImage(message.author.displayAvatarURL())
			.setColor("RANDOM")
			.setFooter(`This profile picture belongs to ${message.author.tag}`)
			message.channel.send(embed)
		}
		if(user) {
			const embed = new Discord.MessageEmbed()
			.setImage(user.displayAvatarURL())
			.setColor("RANDOM")
			.setFooter(`This profile picture belongs to ${user.tag}`)
			message.channel.send(embed)	
		}
}
}