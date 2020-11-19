const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "fox",
    category: "fun",
    aliases: ["floof"],
    description: "Sends a image of a fox",
    run: async (client, message, args) => {

      let {body} = await superagent
      .get(`https://randomfox.ca/floof/`)

      if(!{body}) return message.channel.send("Well dam i broke try again")

          let fEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setImage(body.image)
          .setTimestamp()
          message.channel.send({embed: fEmbed})

      }
  }