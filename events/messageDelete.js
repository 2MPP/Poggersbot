const logs = require('../models/channel');
const Discord = require('discord.js')
module.exports = async (client, message) => {
	if(message.author.bot) return;
	const data = await logs.findOne({
		GuildID: message.guild.id,
	});

	if(data) {
		const loggs = client.channels.cache.get(data.Channel);
		const Message = new Discord.MessageEmbed()
			.setColor('36393F')
			.setTitle(`Deleted Message | ${message.author.username}`)
			.setDescription('**Message Content**: \n ' + message.content);
		loggs.send(Message);

	}
	else if(!data) {
		return;
	}
};