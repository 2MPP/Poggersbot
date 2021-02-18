const {
	MessageEmbed
} = require('discord.js');
const ecoModdel = require('../../models/eco');
module.exports = {
	name: 'leaderboard',
	aliases: ['lb'],
	cooldown: 3,
	category: 'economy',
	description: 'check the servers leaderboard',
	run: async (client, message, args) => {

		const data = await ecoModdel.find({
			GuildID: message.guild.id,
		}).sort({
			'Money': -1
		});
		console.log(data)

		if (data) {
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${message.guild.name} Server leaderboard`);

			for (let i = 0; i < 5; i++) {
				await embed.addField(`No. ${i + 1}`, data[i] ? `<@${data[i].id}>: ${data[i].Money}` : 'N/A');
			}
			message.channel.send(embed);
		}
	},
};