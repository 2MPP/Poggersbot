const WarnModel = require('../../models/warn');
module.exports = {
	name: 'rwarn',
	category: 'moderation',
	description: 'removes warns using uuid',
	usage: '<uuid>',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You have no permissions to do that');
		WarnModel.findByIdAndDelete(args[0]).then(async document => {
			if (!document) return message.channel.send('That is an invalid UUID!');
			if (document.Id == message.member.id) {
				const warningDocument = new WarnModel({
					_id: document._id,
					Moderator: document.Moderator,
					Id: document.Id,
					Reason: document.Reason,
					User: document.User,
					Time: document.Time,
					GuildID: document.GuildID,
				});
				await warningDocument.save();
				return message.channel.send('You can\'t delete warnings from yourself!');
			}
			else {
				const user = await client.users.fetch(document.Id) || null;
				return message.channel.send(`Sucessfully deleted the warning from ${user.tag}!`);
			}
		}).catch(err => {
			console.log(err);
			return message.channel.send('Error when deleting document!');
		});
	},
};
