const prefixModel = require('../../models/prefix');
module.exports = {
	name: 'setprefix',
	category: 'bot',
	description: 'sets bots prefix',
	run: async (client, message, args) => {
		const data = await prefixModel.findOne({
			GuildID: message.guild.id,
		});
		if(!args[0].length) return message.channel.send('Please specify a prefix');

		if (data) {
			await prefixModel.findOneAndRemove({
				GuildID: message.guild.id,
			});

			message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

			const newData = new prefixModel({
				Prefix: args[0],
				GuildID: message.guild.id,
			});
			newData.save();
		}
		else if (!data) {
			message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

			const newData = new prefixModel({
				Prefix: args[0],
				GuildID: message.guild.id,
			});
			newData.save();
		}


	},
};