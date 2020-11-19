const { MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "hug",
    category: "fun",
    description: "hug a user",
    run: async (client, message) => {
    const member = message.mentions.users.first()
      let {body} = await superagent
      .get(`https://some-random-api.ml/animu/hug`)
      if (message.mentions.users.size < 1) return message.channel.send("Please tag a user")
      if (member.id === message.author.id) return message.channel.send("well this is sad you tryed to hug your self")
      if (member.bot) return message.channel.send("Robots dont have feelings dont try hug them :(")
        
        
      if(!{body}) return message.channel.send("Well dam i broke try again");

          let cEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`${message.author} just hugged ${member}`)
          .setImage(body.link)
          .setTimestamp()
          message.channel.send({embed: cEmbed})

      }
  }