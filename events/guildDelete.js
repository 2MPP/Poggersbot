const prefix = require('../models/prefix');
const logs = require('../models/channel');
const welcome = require('../models/welcome');
const warn = require('../models/warn');
const eco = require('../models/eco');

module.exports = async (client, guild, MessageEmbed) => {

	client.users.fetch('251428574119067648', false).then(user => {
		const uwu = new MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);


	});

	client.users.fetch('405771597761216522', false).then(user => {
		const uwu = new MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);

	});
	await logs.deleteOne({ GuildID: guild.id });
	await welcome.deleteOne({ GuildID: guild.id });
	await prefix.deleteOne({ GuildID: guild.id });
	await warn.deleteMany({ GuildID: guild.id });
	await eco.deleteMany({ GuildID: guild.id });


};