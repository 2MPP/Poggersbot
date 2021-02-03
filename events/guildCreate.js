const Discord = require('discord.js')
module.exports = async (client, guild) => {


	client.users.fetch('251428574119067648', false).then(user => {

		const uwu = new Discord.MessageEmbed()
			.setTitle('**New server UwU**')
			.setColor('#FFC0CB')
			.setDescription(`I was added to **${guild.name}** \n Server count is now ${client.guilds.cache.size} \n Guild id is ${guild.id} \n Server has ${guild.members.cache.size} Members`);
		user.send(uwu);
	});

	client.users.fetch('405771597761216522', false).then(user => {

		const uwu = new Discord.MessageEmbed()
			.setTitle('**New server UwU**')
			.setColor('#FFC0CB')
			.setDescription(`I was added to **${guild.name}** \n Server count is now ${client.guilds.cache.size} \n Guild id is ${guild.id} \n Server has ${guild.members.cache.size} Members`);
		user.send(uwu);
	});

};