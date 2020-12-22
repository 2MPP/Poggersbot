module.exports = {
	name: 'test',
	aliases: [],
	category: 'owner',
	description: '',
	usage: '<input>',
	run: (client, message) => {
		console.log(message.guild.id)
	},
};