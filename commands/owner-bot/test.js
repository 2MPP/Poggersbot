module.exports = {
	name: 'test',
	aliases: [],
	category: 'owner-bot',
	description: '',
	cooldown: 60,
	usage: '<input>',
	run: (client, message) => {
		message.channel.send('oops, REEEEEEEEEEEEEEEE');
	},
};