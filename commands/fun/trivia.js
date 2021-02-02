const {
  MessageEmbed
} = require('discord.js');
let questions = [{
    title: "Who is the owner of the bot?",
    options: ["2MP", "Curry", "Both"],
    correct: 3
  },
  {
    title: "What is this command called?",
    options: ["Quiz", "Questions", "Trivia", "A game for old peeps"],
    correct: 3
  },
  {
    title: "How old is the Queen?",
    options: ["80", "86", "90", "94", "98", "99", "69", "None"],
    correct: 4
  },
  {
    title: "How many US Presidents have there been?",
    options: ["38", "45", "44", "40", "49", "50"],
    correct: 2
  },
  {
    title: "What year did World War 2 end?",
    options: ["1914", "1945", "1930", "1946", "1949", "1956"],
    correct: 2
  },
  {
    title: "What is the most popular Mobile Phone Brand?",
    options: ["Apple", "Huawei", "Samsung", "Xiaomi", "Oppo", "LG"],
    correct: 3
  },
  {
    title: "Who is the richest person in the world?",
    options: ["Jeff Bezos", "Bernard Arnault & Family", "Bill Gates", "Mark Zuckerberg", "None they are all poor"],
    correct: 1
  },
  {
    title: "How old is Donald Trump",
    options: ["38", "45", "44", "40", "49", "50"],
    correct: 2
  },
  {
    title: "What is the worlds tallest building?",
    options: ["Shanghai Tower", "Burj Khalifa", "Makkah Clock Tower", "Lotte World Tower", "World Trade Center"],
    correct: 2
  },
  {
    title: "Who was the British Prime Minister before Theresa May?",
    options: ["David Cameron", "Boris Johnson", "Gordon Brown", "Tony Blair", "Margaret Thatcher", "James Callaghan"],
    correct: 1
  },
  {
    title: "What is Sweden's capital city?",
    options: ["Gothenburg", "Malmö", "Uppsala", "Stockholm", "Linköping"],
    correct: 4
  },
  {
    title: "Which youtube channel has the most subscribers?",
    options: ["WWE", "T-Series", "PewDiePie", "MrBeast", "Dude Perfect"],
    correct: 2
  },
  {
    title: "When did Minecraft come out?",
    options: ["2005", "2006", "2008", "2007", "2009", "2010"],
    correct: 5
  },
  {
    title: "When did Roblox come out?",
    options: ["2005", "2006", "2008", "2007", "2009", "2010"],
    correct: 2
  },
  {
    title: "What is the best selling game?",
    options: ["Tetris", "Wii Sports", "PlayerUnknown's Battlegrounds", "Minecraft", "Grand Theft Auto V", "Super Mario Bros", "Wii Sports Resort", "Pac-Man"],
    correct: 4
  },
  {
    title: "What is the most followed Twitch channel?",
    options: ["Pokimane", "Ninja", "Tfue", "Minecraft", "Shroud", "Myth", "DrLupo", "Riot Games"],
    correct: 2
  },
  {
    title: "What is the most spoken language?",
    options: ["Mandarin Chinese", "Hindi", "English", "Spanish", ""],
    correct: 3
  },
  {
    title: "What is the most spoken language?",
    options: ["Mandarin Chinese", "Hindi", "English", "Spanish", "French"],
    correct: 3
  },
  {
    title: "What language is this bot programmed in?",
    options: ["JavaScript", "Python", "Lua", "C#", "Java"],
    correct: 1
  },
  {
    title: "What is the most popular social media network?",
    options: ["Reddit", "Snapchat", "Instagram", "Facebook", "YouTube"],
    correct: 4
  },
  {
    title: "What is the most popular discord bot?",
    options: ["Dyno", "MEE6", "Dank Memer", "Helper.gg", "IdleRPG", "Rythem", "Groovy", "Totally this bot"],
    correct: 2
  },
  {
    title: "What animal has a distinctive scent mark that smells like popcorn?",
    options: ["Otter", "Binturong", "Badger", "Ring Tailed Lemur"],
    correct: 2
  },
  {
    title: "How many types of flamingo are there?",
    options: ["3", "4", "5", "6"],
    correct: 4
  },
  {
    title: "Which big cat can run the fastest?",
    options: ["Lion", "Tiger", "Leopard", "Cheetah"],
    correct: 4
  },
  {
    title: "What is a baby dolphin called?",
    options: ["Calf", "Pup", "Kitten", "Foal"],
    correct: 1
  },
  {
    title: "What is a group of rats called?",
    options: ["A pack", "A chaos", "A mischief", "A destruction"],
    correct: 3
  },
  {
    title: "What is the most popular pet in the UK?",
    options: ["Cats", "Dogs", "Rabbits", "Goldfish"],
    correct: 2
  },
  {
    title: "Who was the first actor to play James Bond?",
    options: ["George Lazenby", "Sean Connery", "Roger Moore", "Timothy Dalton"],
    correct: 2
  },
  {
    title: "How many Ice Age films have there been?",
    options: ["2", "4", "6", "8", "10", "3"],
    correct: 6
  },
  {
    title: "What colour are the Smurfs?",
    options: ["Red", "Yellow", "Green", "Blue", "Orange", "Purple", "None they are none existant"],
    correct: 4
  },
  {
    title: "Who plays Jack Sparrow in Pirates of the Caribbean?",
    options: ["Orlando Bloom", "Tom Hardy", "Christ Evans", "Johnny Depp", "Spooderman"],
    correct: 5
  },
  {
    title: "When did Neil Armstrong becomes the first person to walk on the moon?",
    options: ["1969", "1973", "1977", "1983"],
    correct: 1
  },
  {
    title: "When did Columbus 'Discover' America",
    options: ["1201", "1492", "1575", "1699"],
    correct: 2
  },
  {
    title: "When was the Fall of the Berlin Wall?",
    options: ["1969", "1979", "1989", "1999"],
    correct: 3
  },
  {
    title: "When did the Wright Brothers fly the first airplane?",
    options: ["1888", "1903", "1917", "1931"],
    correct: 1
  },
  {
    title: "When did World War 1 Begin?",
    options: ["1813", "1873", "1893", "1914"],
    correct: 4
  },
  {
    title: "When did the Japanese bomb Pearl Harbor?",
    options: ["1929", "1939", "1941", "1945"],
    correct: 3
  },
  {
    title: "When the start of the Great Depression?",
    options: ["1893", "1907", "1919", "1929"],
    correct: 4
  },
  {
    title: "When did the Black Plague reach Europe?",
    options: ["799", "1230", "1045", "1347", "1501", "1720"],
    correct: 6
  },
  {
    title: "When did Napoleon's final defeat at the Battle of Waterloo?",
    options: ["1701", "1751", "1815", "1871", "1942"],
    correct: 3
  },
  {
    title: "When did the US Civil War begin?",
    options: ["1831", "1861", "1791", "1891", "2010"],
    correct: 2
  }

];
module.exports = {
  name: "trivia",
  description: "Test your knowledge!",
  category: "fun",
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
  },
};