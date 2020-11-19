const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');
const random = Math.random(Math.floor(100)*599)
module.exports = {
    name: "cat",
    category: "fun",
    description: "Sends a image of a cat",
    run: async (client, message, args) => {

      let {body} = await superagent
      .get(`https://some-random-api.ml/img/cat`)

      if(!{body}) return message.channel.send("Well dam i broke try again")

          let cEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setImage(body.link)
          .setTimestamp()
          message.channel.send({embed: cEmbed})

      }
  }