const {
  MessageEmbed
} = require('discord.js');


module.exports = {
  name: 'testboi',
  cooldown: 3,
  description: 'This is a test command!',
  run: async (client, message, args) => {

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Triva')
      .setDescription('<General Knowledge|History|Geography> are the only valid arguments, anything else won\'t be accepted. \n \u200B \n To utilise this command run <rps general|history|geography>');

    const acceptedReplies = ['general', 'history', 'geography'];

    const choice = args[0];
    if (!choice) return message.channel.send(embed);
    if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these options are accepted (More Coming soon): \`${acceptedReplies.join(', ')}\``);

    switch (choice) {
      case 'general': {
        let q = questionsgeneral[Math.floor(Math.random() * questionsgeneral.length)];
        let i = 0;
        const Embed = new MessageEmbed()
          .setTitle(q.gen_question[2].title)
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
          let msgs = await message.channel.awaitMessages((u2) => u2.author.id === message.author.id, {
            time: 15000,
            max: 1,
            errors: ["time"]
          });
          if (parseInt(msgs.first().content) == q.correct) {
            return message.channel.send(`You got it correct!`)
          } else {
            return message.channel.send(`You got it incorrect.`);
          }
        } catch (e) {
          return message.channel.send(`You did not answer!`);
        }
      }
    }
  }
}