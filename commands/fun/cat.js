const fetch = require('node-fetch');
const Discord = require('discord.js');


module.exports = {
	name: 'cat',
	category: 'fun',
	aliases: ['penissize'],
	description: 'Tells your peepee size ',
	run: async (client, message) => {
		fetch('https://some-random-api.ml/img/cat')
			.then(res => res.text())
			.then(body => exampleEmbed = new Discord.MessageEmbed()
				.setImage(body.url),
				.setColor('RANDOM')
			);
	},
};