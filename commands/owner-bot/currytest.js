const { MessageEmbed } = require('discord.js');
let questions = [
 

    {
      title: "What is the most popular social media network?",
      options: ["Reddit", "Snapchat", "Instagram", "Facebook", "YouTube"],
      correct: 4
    }

];
module.exports = {
    name: "miketest",
    description: "Test your knowledge!",
    cooldown: 3,
    run: async (bot, message, args) => {
      let q = questions[Math.floor(Math.random() * questions.length)];
      let i = 0;
      const Embed = new MessageEmbed()
        .setTitle(q.title)
        .setDescription(
          q.options.map((opt) => {
            i++;
            return `${i} - ${opt}\n`;
          })
        )
        .setColor(`GREEN`)
        .setFooter(`Reply to this message with the correct question number! You have 15 seconds.`);
      message.channel.send(Embed);
      try {
        let msgs = await message.channel.awaitMessages((u2) => u2.author.id === message.author.id,{ time: 15000, max: 1, errors: ["time"] });
        if (parseInt(msgs.first().content) == q.correct) {
          return message.channel.send(`You got it correct!`) 
        } else {
          return message.channel.send(`You got it incorrect.`);
        }
      } catch (e) {
        return message.channel.send(`You did not answer!`);
      }
    },
  };