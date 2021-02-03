module.exports = {
	name: 'poll',
	category: 'moderation',
	description: 'makes a this or that poll',
	usage: '<args>',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You have no permissions to do that');

		if (message.deletable) message.delete();

		message.channel.send('**' + ':bar_chart:' + ' ' + args.join(' ') + '**').then(messageReaction => {

			messageReaction.react('👍');
			messageReaction.react('👎');
		});


	},
};