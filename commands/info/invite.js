const Discord = require('discord.js');



module.exports = {
      name: "invite",
	  usage: "<id | mention>",
	  category: "info",
      description: "infomation for the bot",
      run: async (client, message, args) => {
		  const embed = new Discord.MessageEmbed()
		  
		  .setTitle('**Hi**')
		  .setURL('https://discordapp.com/oauth2/authorize?client_id=655381794555822091&scope=bot&permissions=8')
		  .setDescription(`**Bot invite: [Click here](https://discordapp.com/oauth2/authorize?client_id=655381794555822091&scope=bot&permissions=8) \n Support server[Click here](https://discord.gg/JFCBAbp)**`)
		  .setColor('RED')
		  
		  message.channel.send(embed)
		  
	  }
	}