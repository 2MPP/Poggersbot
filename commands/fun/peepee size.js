module.exports = {
	name: 'pp',
	category: 'fun',
	cooldown: 3,
	aliases: ['penissize'],
	description: 'Tells your peepee size ',
	run: async (client, message) => {
		const peepee = Math.floor(Math.random(1) * 100);
		const user = message.mentions.users.first();

		if (!user) {
			if(message.author.id == 270589816075321344) return message.channel.send('Your peepee is taller than the Eifel Tower :)');
			if(message.author.id == 415863948320178178) return message.channel.send('8==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================D');
			message.channel.send(`Your peepee size is ${peepee} inches`);
		}
		if (user) {
			if(user.id == 270589816075321344) return message.channel.send('their peepee is taller than the Eifel Tower :)');
			if(user.id == 415863948320178178) return message.channel.send('8==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================D');
			message.channel.send(`There peepee size is ${peepee} inches`);
		}
	},
};