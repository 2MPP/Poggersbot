const AntiSpamModel = require('../../models/antispam');
module.exports = {
	name: 'antispam',
	category: 'bot',
	description: 'enable or disable antispam',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You have no permissions to do that');
		message.reply('Are you sure you want to enable antispam react with ✅ else react with ❌');

		message.react('✅').then(r => {
			message.react('❌');
		});


		message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
			{ max: 1, time: 30000 }).then(async collected => {
			if (collected.first().emoji.name == '✅') {


				const data = await AntiSpamModel.findOne({
					GuildID: message.guild.id,
				});

				if (data) {
					await AntiSpamModel.findOneAndRemove({
						GuildID: message.guild.id,
					});

					message.reply('You have enabled Antispam');

					const newData = new AntiSpamModel({
						Enable: 'enable',
						GuildID: message.guild.id,
					});
					newData.save();
				}
				else if (!data) {
					message.reply('You have enabled Antispam');

					const newData = new AntiSpamModel({
						Enable: 'enable',
						GuildID: message.guild.id,
					});
					newData.save();

				}


			}
			else {
				const data = await AntiSpamModel.findOne({
					GuildID: message.guild.id,
				});

				if (data) {
					await AntiSpamModel.findOneAndRemove({
						GuildID: message.guild.id,
					});

					message.reply('You have disabled antispam');

					const newData = new AntiSpamModel({
						Enable: 'disable',
						GuildID: message.guild.id,
					});
					newData.save();
				}
				else if (!data) {
					message.reply('You have disabled antispam');

					const newData = new AntiSpamModel({
						Enable: 'disable',
						GuildID: message.guild.id,
					});
					newData.save();
				}
			}
		}).catch(() => {
			message.reply('No reaction after 30 seconds, operation canceled');
		});
	},
};