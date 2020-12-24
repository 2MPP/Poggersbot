const ecoModdel = require('../../models/eco');
const prefixModdel = require('../../models/prefix');
module.exports = {
	name: 'bal',
	aliases: ['balance'],
	cooldown: 3,
	category: 'economy',
	description: 'Check how much money you have',
	run: async (client, message, args) => {

		const data = await ecoModdel.findOne({
			GuildID: message.guild.id,
			_id: message.author.id,
		});

		const Data = await prefixModdel.findOne({
			GuildID: message.guild.id,
		});

		if(data) {
			message.reply(`Your current balance is \`\`${data.Money}\`\``);
		}
		else {
			message.reply(`You dont have any money you can get money by using \`\`${Data.Prefix}work\`\` Or \`\`${Data.Prefix}crime\`\``);
		}


	},
};