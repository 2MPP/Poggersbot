const WelcomeModel = require('../../models/welcome');
module.exports = {
	name: 'setwelcome',
	category: 'bot',
	description: 'sets bots welcome',
	run: async (client, message, args) => {
		if(args < 1) return message.channel.send('Please say a channel');
		const channel = message.mentions.channels.first().id;
		const data = await WelcomeModel.findOne({
			GuildID: message.guild.id,
		});

		if (data) {
			await WelcomeModel.findOneAndRemove({
				GuildID: message.guild.id,
			});

			message.channel.send(`The new welcome channel is now **<#${channel}>**`);

			const newData = new WelcomeModel({
				Channel: channel,
				GuildID: message.guild.id,
			});
			newData.save();
		}
		else if (!data) {
			message.channel.send(`The new welcome channel is now **<#${channel}>**`);

			const newData = new WelcomeModel({
				Channel: channel,
				GuildID: message.guild.id,
			});
			newData.save();
		}


	},
};