module.exports = {
	name: 'test',
	aliases: [],
	category: 'owner',
	description: '',
	usage: '<input>',
	run: (client, message, args) => {
		message.channel.send(`What did u think was gonna happen?`)
	},
};