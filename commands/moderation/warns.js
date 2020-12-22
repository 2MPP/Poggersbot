const WarnModel = require('../../models/warn');
module.exports = {
	name: 'warns',
	category: 'moderation',
	description: 'check how many warns you have',
	usage: '<mention> <reason>',
	run: async (client, message, args) => {
		const user = message.mentions.members.first();

		if(user) {
			const data = await WarnModel.find({
				Id: user.id,
			});

			const x = data.length;

			message.channel.send(`The user has been warned **${x}** times`);
		}
		else {
			const data = await WarnModel.find({
				Id: message.author.id,
			});

			const x = data.length;

			message.channel.send(`You has been warned **${x}** times`);
		}
	},
};