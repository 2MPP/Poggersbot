const {
  RichEmbed
} = require("discord.js");

module.exports = {
  name: "numbergenerator",
  category: "fun",
  cooldown: 3,
  aliases: ["numgen"],
  description: "picks a random number 1 to 1000000",
  run: async (client, message, args) => {
    const random = Math.floor(Math.random(1) * 1000000)
    message.channel.send(random)


  }
}