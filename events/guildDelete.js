const prefix = require('../models/prefix');
const logs = require('../models/channel');
const welcome = require('../models/welcome');
const warn = require('../models/warn');
const eco = require('../models/eco');
const antispam = require('../models/antispam');
const Discord = require('discord.js')
module.exports = async (client, guild) => {

	client.users.fetch('251428574119067648', false).then(user => {
		const uwu = new Discord.MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);


	});

	client.users.fetch('405771597761216522', false).then(user => {
		const uwu = new Discord.MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);

	});
	await logs.deleteOne({ GuildID: guild.id });
	await welcome.deleteOne({ GuildID: guild.id });
	await prefix.deleteOne({ GuildID: guild.id });
	await warn.deleteMany({ GuildID: guild.id });
	await eco.deleteMany({ GuildID: guild.id });
	await antispam.deleteMany({ GuildID: guild.id });

};