const ecoModdel = require('../../models/eco');
module.exports = {
	name: 'work',
	cooldown: 86400,
	category: 'economy',
	description: 'work your job and get money ',

	run: async (client, message, args) => {
		const money = Math.floor(Math.random(1) * 1000);
		message.channel.send(`You work your job and get \`${money}\` `);
		const data = await ecoModdel.findOne({
			GuildID: message.guild.id,
			_id: message.author.id,
		});

		if(data) {
			// if user alrady has money saved

			const num1 = parseInt(data.Money);
			const num2 = parseInt(money);


			await ecoModdel.findByIdAndUpdate(message.author.id, { Money: num1 + num2 });
		}
		else {
			// if user dosnt have money saved
			const Data = new ecoModdel({
				_id: message.author.id,
				Money: money,
				GuildID: message.guild.id,
			});
			Data.save();
		}

	},
};