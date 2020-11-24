const ChannelModel = require('../../models/channel');
module.exports = {
	name: 'setlogs',
	category: 'bot',
	description: 'sets bots logs',
	run: async (client, message, args) => {
		if(args < 1) return message.channel.send('Please say a channel');
		const channel = message.mentions.channels.first().id;
		const data = await ChannelModel.findOne({
			GuildID: message.guild.id,
		});

		if (data) {
			await ChannelModel.findOneAndRemove({
				GuildID: message.guild.id,
			});

			message.channel.send(`The new log channel is now **<#${channel}>**`);

			const newData = new ChannelModel({
				Channel: channel,
				GuildID: message.guild.id,
			});
			newData.save();
		}
		else if (!data) {
			message.channel.send(`The new log channel is now **<#${channel}>**`);

			const newData = new ChannelModel({
				Channel: channel,
				GuildID: message.guild.id,
			});
			newData.save();
		}


	},
};