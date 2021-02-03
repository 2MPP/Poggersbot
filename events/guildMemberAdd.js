const welcome = require('../models/welcome');
const Discord = require('discord.js')
module.exports = async (client, member) => {

	const data = await welcome.findOne({
		GuildID: member.guild.id,
	});
	if(data) {
		const welcome2 = client.channels.cache.get(data.Channel);
		const mkk = new Discord.MessageEmbed()
			.setTitle('**Welcome!**\n')
			.setColor('RANDOM')
			.setThumbnail(member.user.avatarURL())
			.setDescription(`welcome to **${member.guild.name}**, ${member}. \n **make sure to read the rules!**`)
			.setTimestamp()
			.setFooter(`Member count ${member.guild.memberCount}`);
		welcome2.send(mkk);
	}
	else if(!data) {
		return;
	}
};