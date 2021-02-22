const ecoModdel = require('../../models/eco');
const money = Math.floor(Math.random(1) * 1000);
const {
	promptMessage,
} = require('../../functions.js');


module.exports = {
	name: 'crime',
	cooldown: 3600,
	category: 'economy',
	description: 'commit crime',
	run: async (client, message, args) => {
		var JobText = [
			`On the way to work you find a wallet that has $\`\`${money}\`\` in it`,
			`You steal a car from the street and sell it for $\`\`${money}\`\``,
			`You assassinate a target for a client and get paid $\`\`${money}\`\``,
			`You picklock a car and find in it $\`\`${money}\`\``,
			`You break into a ATM and it contains inside $\`\`${money}\`\``,
			`You grab a persons wallet out a persons hand and get $\`\`${money}\`\``,
			`You hack you're a strangers bank account and gain $\`\`${money}\`\``,
			`On your way to work there was a van dropping money on the floor you grab $\`\`${money}\`\``,
			`On the way to the store you found a broken window and find $\`\`${money}\`\``,
			`A person buys you're botnet service and you gain $\`\`${money}\`\``,
		];

		var CrimeText = JobText[Math.floor(Math.random() * JobText.length)];
		var OneOrZero = ['0', '1'];
		var chance = OneOrZero[Math.floor(Math.random() * OneOrZero.length)];

		await message.channel.send('Are you sure you want to do this?').then(async msg => {

			const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

			if (emoji === '✅') {
				msg.delete();

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
							Money: num1 + num2,
						});
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
					message.channel.send(CrimeText);
				}
				else {
					const data = await ecoModdel.findOne({
						GuildID: message.guild.id,
					});

					if (data) {
						// if user alrady has money saved

						const num1 = parseInt(data.Money);
						const num2 = parseInt(1000);


						await ecoModdel.findByIdAndUpdate(message.author.id, {
							Money: num1 - num2,
						});
					}
					else {
						// if user dosnt have money saved
						const Data = await new ecoModdel({
							_id: message.author.id,
							Money: '-1000',
							GuildID: message.guild.id,
						});
						Data.save();

					}
					message.channel.send(`You were caught and fined for 1000 \n Your balance is now \`\`${data.Money}\`\``);
				}
			}
			else if (emoji === '❌') {
				msg.delete();

				message.reply('Action cancled')
					.then(m => m.delete({
						timeout: 5000,
						reason: 'Auto message timeout',
					}));
			}
		});

	},
};