const ecoModdel = require('../../models/eco');
const money = Math.floor(Math.random(1) * 1000);
module.exports = {
	name: 'search',
	cooldown: 1,
	category: 'economy',
	description: 'search',
	run: async (client, message, args) => {
		var JobText = [
			`You search a shoe, god knows why but you found $\`\`${money}\`\``,
			`You search the pockets of your trousers and found $\`\`${money}\`\` they must have been pretty deep..`,
			`You stare into the washing machine, magically finding $\`\`${money}\`\` damn your mind is powerful!`,
			`You decide to go sewer dipping, finding  $\`\`${money}\`\` your just discusting m8..`,

		];

		var SearchText = JobText[Math.floor(Math.random() * JobText.length)];
		var OneOrZero = ['0', '1'];
		var chance = OneOrZero[Math.floor(Math.random() * OneOrZero.length)];

		if (chance == 1) {
			const data = await ecoModdel.findOne({
				GuildID: message.guild.id,
				_id: message.author,
			});

			if (data) {
				// if user alrady has money saved

				const num1 = parseInt(data.Money);
				const num2 = parseInt(money);


				await ecoModdel.findByIdAndUpdate(message.author.id, {
					Money: num1 + num2
				});
			} else {
				// if user dosnt have money saved
				const Data = new ecoModdel({
					_id: message.author.id,
					Money: money,
					GuildID: message.guild.id,
				});
				Data.save();

			}
			message.channel.send(SearchText);
		} else {
			const data = await ecoModdel.findOne({
				GuildID: message.guild.id,
			});

			if (data) {
				// if user alrady has money saved

				const num1 = parseInt(data.Money);
				const num2 = parseInt(1000);


				await ecoModdel.findByIdAndUpdate(message.author.id, {
					Money: num1 - num2
				});
			} else {
				// if user dosnt have money saved
				const Data = await new ecoModdel({
					_id: message.author.id,
					Money: '-10',
					GuildID: message.guild.id,
				});
				Data.save();

			}
			message.channel.send(`You were fined for $10 for your efforts \n Your balance is now $\`\`${data.Money}\`\``);
		}


	},
};