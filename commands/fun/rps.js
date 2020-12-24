const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'rps',
	category: 'fun',
	description: 'This is a Rock Paper Scissors command!',
	run: async (client, message, args) => {

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('How to play')
			.setDescription('<rock|paper|scissors> are the only valid arguments, anything else won\'t be accepted. \n \u200B \n To utilise this command run <rps rock|paper|scissors>');

		const acceptedReplies = ['rock', 'paper', 'scissors'];
		const random = Math.floor((Math.random() * acceptedReplies.length));
		const result = acceptedReplies[random];

		const choice = args[0];
		if (!choice) return message.channel.send(embed);
		if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);

		if (result === choice) return message.reply('It\'s a tie! We had the same choice.');

		switch (choice) {
		case 'rock': {
			if (result === 'paper') return message.reply('You suck, you lose! Better luck next time :P');
			else return message.reply('I lost. How can this be...');
		}
		case 'paper': {
			if (result === 'scissors') return message.reply('You suck, you lose! Better luck next time :P');
			else return message.reply('I lost. How can this be...');
		}
		case 'scissors': {
			if (result === 'rock') return message.reply('You suck, you lose! Better luck next time :P');
			else return message.reply('I lost. How can this be...');
		}
		default: {
			return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
		}
		}
	},
};
