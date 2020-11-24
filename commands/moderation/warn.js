const WarnModel = require('../../models/warn');
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
		});
		Data.save();

		message.channel.send(`Successfully warned ${ToWarn} for the reason ${reason}`);
	},
};