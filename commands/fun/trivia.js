const { MessageEmbed } = require('discord.js');
let questions = [
    {
        title: "Who is the owner of the bot?",
        options: ["2MP","Curry","Both"],
        correct: 3
    },
    {
        title: "What is this command called?",
        options: ["Quiz","Questions","Trivia","A game for old peeps"],
        correct: 3
    },
    {
      title: "How old is the Queen?",
      options: ["80","86","90","94","98","99","69","None"],
      correct: 4
    },
    {
      title: "How many US Presidents have there been?",
      options: ["38","45","44","40","49","50"],
      correct: 2
    },
    {
      title: "What year did World War 2 end?",
      options: ["1914","1945","1930","1946","1949","1956"],
      correct: 2
    },
    {
      title: "What is the most popular Mobile Phone Brand?",
      options: ["Apple","Huawei","Samsung","Xiaomi","Oppo","LG"],
      correct: 3
    },
    {
      title: "Who is the richest person in the world?",
      options: ["Jeff Bezos","Bernard Arnault & Family","Bill Gates","Mark Zuckerberg","None they are all poor"],
      correct: 1
    },
    {
      title: "How old is Donald Trump",
      options: ["38","45","44","40","49","50"],
      correct: 2
    },
    {
      title: "What is the worlds tallest building?",
      options: ["Shanghai Tower","Burj Khalifa","Makkah Clock Tower","Lotte World Tower","World Trade Center"],
      correct: 2
    },
    {
      title: "Who was the British Prime Minister before Theresa May?",
      options: ["David Cameron","Boris Johnson","Gordon Brown","Tony Blair","Margaret Thatcher","James Callaghan"],
      correct: 1
    },
    {
      title: "What is Sweden's capital city?",
      options: ["Gothenburg","Malmö","Uppsala","Stockholm","Linköping"],
      correct: 4
    },
    {
      title: "Which youtube channel has the most subscribers?",
      options: ["WWE","T-Series","PewDiePie","MrBeast","Dude Perfect"],
      correct: 2
    },
];
module.exports = {
    name: "trivia",
    description: "Test your knowledge!",
    category: "fun",
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
          return message.channel.send(`You got it correct!`);
        } else {
          return message.channel.send(`You got it incorrect.`);
        }
      } catch (e) {
        return message.channel.send(`You did not answer!`);
      }
    },
  };