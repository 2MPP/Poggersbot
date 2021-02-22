const { MessageEmbed } = require('discord.js');
const ecoModdel = require('../../models/eco');
module.exports = {
	name: 'globalleaderboard',
	aliases: ['glb'],
	cooldown: 3,
	category: 'economy',
	description: 'check the global leaderboard',
	run: async (client, message, args) => {

		const data = await ecoModdel.find({}).sort({
			'Money': -1,
		});

		if (data) {
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Global leaderboard');

			for (let i = 0; i < 5; i++) {
				const player = client.users.cache.find(user => user.id === data[i].id);
				await embed.addField(`No. ${i + 1}`, data[i] ? `**${player.username}**: ${data[i].Money}` : 'N/A');
			}
			message.channel.send(embed);
		}
	},
};