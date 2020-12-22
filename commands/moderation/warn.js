const WarnModel = require('../../models/warn');
const logs = require('../../models/channel');
const { v4: uuidv4 } = require('uuid');
const Discord = require('discord.js');
module.exports = {
	name: 'warn',
	category: 'moderation',
	description: 'warn a user',
	usage: '<mention> <reason>',
	run: async (client, message, args) => {

		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You have no permissions to do that');
		if(args < 1) return message.channel.send('Need to mention a user');
		const ToWarn = message.mentions.members.first();
		const mod = message.author;
		const reason = args.slice('1').join(' ') || 'No reason given';
		const id = ToWarn.id;
		const time = message.createdAt;

		const Data = new WarnModel({
			Id: id,
			Moderator: mod.username,
			Reason: reason,
			User: ToWarn.user.username,
			Time: time,
			GuildID: message.guild.id,
			_id: uuidv4(),
		});
		Data.save();
		// sending to logs channel
		const data = await logs.findOne({
			GuildID: message.guild.id,
		});

		if(data) {
			const loggs = client.channels.cache.get(data.Channel);
			const Message = new Discord.MessageEmbed()

				.setColor('#FF0000')
				.setTitle(`New report (UUID ${uuidv4()} )`)
				.addFields(
					{ name: 'Warned user', value: ToWarn },
					{ name: 'Warned user\'s id', value: id },
					{ name: 'Warned by', value: mod },
					{ name: 'Reason', value: reason },
					{ name: 'Warned at', value: time },
				);

			loggs.send(Message);
			message.channel.send('User warned');
			ToWarn.send(`You have been warned by ${mod} for reason **${reason}**`).catch(() => {});
		}
		else if(!data) {
			const Message = new Discord.MessageEmbed()

				.setColor('#FF0000')
				.setTitle(`New report (UUID ${uuidv4()} )`)
				.addFields(
					{ name: 'Warned user', value: ToWarn },
					{ name: 'Warned user\'s id', value: id },
					{ name: 'Warned by', value: mod },
					{ name: 'Reason', value: reason },
					{ name: 'Warned at', value: time },
				)
				.setFooter('You can get this to be sent to a certain channel if you use the setlogs command', `${client.user.avatarURL()}`);
			message.channel.send(Message);
			ToWarn.send(`You have been warned by ${mod} for reason **${reason}**`).catch(() => {});
		}
	},
};