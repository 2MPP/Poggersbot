const {
	MessageEmbed
} = require('discord.js');

let questionsgeneral = [{
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
  title: "What is the most popular Mobile Phone Brand?",
  options: ["Apple", "Huawei", "Samsung", "Xiaomi", "Oppo", "LG"],
  correct: 3
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
  title: "What is the most spoken language?",
  options: ["Mandarin Chinese", "Hindi", "English", "Spanish", "French"],
  correct: 3
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
  correct: 4
},
{
  title: "When did Neil Armstrong becomes the first person to walk on the moon?",
  options: ["1969", "1973", "1977", "1983"],
  correct: 1
},
{
  title: "What was the most expensive film?",
  options: ["Avengers: Age of Ultron", "Avengers: Endgame", "Avengers: Infinity War", "Pirates of the Caribbean: On Stranger Tides", "Pirates of the Caribbean: At World's End", "Star Wars: The Rise of Skywalker", "Spider-Man 3"],
  correct: 4
},

];

let questionshistory = [{
  title: "When did the Black Plague reach Europe?",
  options: ["799", "1230", "1045", "1347", "1501", "1720"],
  correct: 6
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
},
{
  title: "What year did World War 2 end?",
  options: ["1914", "1945", "1930", "1946", "1949", "1956"],
  correct: 2
}
];

let questionsgeography = [{
  title: "Which of these U.S. states does NOT border Canada?",
  options: ["Minnesota", "Alaska", "Maine", "Indiana"],
  correct: 4
},
{
  title: "Which of these countries was NOT a part of the Soviet Union?",
  options: ["Georgia", "Poland", "Belarus", "Ukraine"],
  correct: 2
},
{
  title: "Which of these cities is NOT a national capital?",
  options: ["Cairo", "Sydney", "Prague", "Bangkok"],
  correct: 2
},
{
  title: "Which of these cities DOESN'T border the Mediterranean Sea?",
  options: ["Monaco", "Lisbon", "Alexandria", "Barcelona"],
  correct: 2
},
{
  title: "Which of these countries was NEVER part of the British Empire?",
  options: ["Kenya", "New Zeland", "Ireland", "Thailand"],
  correct: 4
},
{
  title: "Which one of these cities is NOT in the Southern Hemisphere?",
  options: ["Johannesburg", "Brasilia", "Colombo", "Brisbane"],
  correct: 3
},
{
  title: "Which one of these countries is NOT in Central America?",
  options: ["Suriname", "Panama", "Belize", "Honduras"],
  correct: 1
},
{
  title: "Which of these cities does NOT border the Great Lakes?",
  options: ["Pittsburgh", "Chicago", "Toronto", "Cleveland"],
  correct: 1
},
{
  title: "Which of these countries is NOT majority-Muslim?",
  options: ["Albania", "Morocco", "Ethipoia", "Indonesia"],
  correct: 3
},
{
  title: "Which of these countries is NOT recognized by the United Nations?",
  options: ["Taiwan", "Iran", "Cyrpus", "Israel"],
  correct: 1
},
{
  title: "Which of these mountain ranges is NOT in Europe?",
  options: ["The pyrenees", "arpathian Mountains", "Atlas Mountains", "The Alps"],
  correct: 3
},
{
  title: "Which of these things is NOT located in Africa?",
  options: ["Aswan Dam", "Gobi Desert", "Zambezi River", "Lake Victoria"],
  correct: 2
},
{
  title: "Which of these countries is NOT one of the top 20 oil producers?",
  options: ["Iraq", "Norway", "United States", "Morocco"],
  correct: 4
},
{
  title: "Which of these cities is NOT in India?",
  options: ["Chennai", "Bhopal", "Bangalore", "Karachi"],
  correct: 4
},
{
  title: "Which of these countries does NOT have only one border?",
  options: ["Portugal", "Ireland", "North Korea", "Haiti"],
  correct: 3
},
{
  title: "What is Sweden's capital city?",
  options: ["Gothenburg", "Malmö", "Uppsala", "Stockholm", "Linköping"],
  correct: 4
},
{
  title: "What is Japan's capital city?",
  options: ["Kyoto", "Tokyo", "Osaka", "Sapporo", "Hiroshima"],
  correct: 2
},
{
  title: "What is the United Kingdom's capital city?",
  options: ["Manchester", "Bristol", "Edinburgh", "Birmingham", "London"],
  correct: 5
},
{
  title: "What is the tallest mountain in the world?",
  options: ["K2", "Makula", "Mount Everest", "Ananga Parbat"],
  correct: 3
},
{
  title: "What country has the highest population?",
  options: ["India", "China", "United States", "Indonesia", "Pakistan", "Nigeria"],
  correct: 2
},

];


let questionscars = [{
  title: "Where was the first car made?",
  options: ["1992", "1842", "1886", "1883"],
  correct: 3
},
{
  title: "Henry Ford started his first motro vehicle company in 1899. It was called the Detroit Automobile Compnay. Is this statement true or false?",
  options: ["True", "False"],
  correct: 1
},
{
  title: "True or false? Electric cars were common in the early 1900s",
  options: ["True", "False"],
  correct: 1
},
{
  title: "What year was the Corvette first introduced?",
  options: ["1953", "1973", "1963", "1943"],
  correct: 1
},
{
  title: "The inventor of cruise control was",
  options: ["A robot", "A blind man", "A 12 year old child", "A homeless man"],
  correct: 2
},
{
  title: "What animal is on the Porsche logo?",
  options: ["Horse", "Bird", "Lion", "Bull"],
  correct: 1
},
{
  title: "What are special performance editions of Honda cars called?",
  options: ["Type M", "Type A", "Type R", "Type D"],
  correct: 3
},
{
  title: "What was the Volkswagen Beetle called when it first sold in the United States?",
  options: ["Liberty Wagon", "Victory Wagon", "Freedom Wagon", "Kraut Wagon"],
  correct: 2
},
{
  title: "What was the first production car in the world with laser headlights?",
  options: ["BMW E12", "BMW I8", "BMW M1", "BMW Z1"],
  correct: 2
},
{
  title: "What is the most expensive car?",
  options: ["Rolls-Royce Sweptail", "Bugatti Veyron Chiron", "Lamborghini Veneno Roadster", "Bugatti La Voiture Noire", "Koenigsegg CCXR Trevita", "Lykan Hypersport"],
  correct: 4
},
{
  title: "What is the fastest car in the world?",
  options: ["SSC Tuatara", "Bugatti Chiron Supersport", "Lamborghini Aventador SVJ", "Audi R8", "Nissan GTR"],
  correct: 2
},
{
  title: "What is the slowest car in the world?",
  options: ["Peel P50", "Aixam Coupe", "Renault Twizy", "Mia Electric Car", "Hindustan Ambassador 1.5 DSZ"],
  correct: 1
},
{
  title: "What is the most bought car?",
  options: ["Volkswagen Beetle", "Ford Model T", "Toyota Corolla", "Ford F-Series", "Chevy Silverado"],
  correct: 3
}

]



let questionsgame = [{
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
    title: "Most played mobile game by download? (2016)",
    options: ["Pokemon GO", "Puano Tiles 2", "My Talking Tom", "Clash Royale", "Subway Surfers"],
    correct: 1
  },
  {
    title: "Which of the following consoles was released by 'Sega'?",
    options: ["Zodiac", "Dreamcast", "Gamecube", "Jaguar"],
    correct: 2
  },
  {
    title: "Which game in the 'Final Fantasy' franchise was the first to spawn a direct sequel?",
    options: ["Final Fantasy X", "Final Fantasy V", "Final Fantasy VII", "Final Fantasy XII"],
    correct: 1
  },
  {
    title: "Under what name did Mario debut 1981's 'Donkey Kong'?",
    options: ["Plumberman", "Jumperman", "Mario", "Luigi"],
    correct: 2
  },
  {
    title: "Which of the following is NOT a ghost from the original Pac-Man?",
    options: ["Winky", "Clyde", "Blinky", "Inky"],
    correct: 1
  },
  {
    title: "What year was Grand Theft Auto V first released?",
    options: ["2014", "2012", "2013", "2015"],
    correct: 3
  },
  {
    title: "Which oif the following names is NOT a main character in Detroit: Become Human?",
    options: ["Kara", "Markus", "James", "Connor"],
    correct: 3
  },
  {
    title: "Which youtube channel has the most subscribers?",
    options: ["WWE", "T-Series", "PewDiePie", "MrBeast", "Dude Perfect"],
    correct: 2
  },
  {
    title: "What is the most followed Twitch channel?",
    options: ["Pokimane", "Ninja", "Tfue", "Minecraft", "Shroud", "Myth", "DrLupo", "Riot Games"],
    correct: 2
  }
]

module.exports = {
	name: 'trivia',
	cooldown: 3,
  category: "fun",
	description: 'This is a trivia command!',
	run: async (client, message, args) => {

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Triva') 
			.setDescription('To utilise this command run, "triva general" or any of the other options available');

		const acceptedReplies = ['general', 'history', 'geography', 'games', 'cars']; 

		const choice = args[0];
		if (!choice) return message.channel.send(embed);
		if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these options are accepted (More Coming soon): \`${acceptedReplies.join(', ')}\``);

		switch (choice) {
			case 'general': {
        let qg = questionsgeneral[Math.floor(Math.random() * questionsgeneral.length)];
        let ig = 0;
        const Embed = new MessageEmbed()
          .setTitle(qg.title)
          .setDescription(
            qg.options.map((opt) => {
              ig++;
              return `${ig} - ${opt}\n`;
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
          if (parseInt(msgs.first().content) == qg.correct) {
            return message.channel.send(`You got it correct!`)
          } else {
            return message.channel.send(`You got it incorrect.`);
          }
        } catch (e) {
          return message.channel.send(`You did not answer!`);
    };
      }
			
			case 'history': {
        let qh = questionshistory[Math.floor(Math.random() * questionshistory.length)];
        let ih = 0;
        const Embed = new MessageEmbed()
          .setTitle(qh.title)
          .setDescription(
            qh.options.map((opt) => {
              ih++; 
              return `${ih} - ${opt}\n`;
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
          if (parseInt(msgs.first().content) == qh.correct) {
            return message.channel.send(`You got it correct!`)
          } else {
            return message.channel.send(`You got it incorrect.`);
          }
        } catch (e) {
          return message.channel.send(`You did not answer!`);
    };
			}
			case 'geography': {
				let qge = questionsgeography[Math.floor(Math.random() * questionsgeography.length)];
        let ige = 0;
        const Embed = new MessageEmbed()
          .setTitle(qge.title)
          .setDescription(
            qge.options.map((opt) => {
              ige++;
              return `${ige} - ${opt}\n`;
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
          if (parseInt(msgs.first().content) == qge.correct) {
            return message.channel.send(`You got it correct!`)
          } else {
            return message.channel.send(`You got it incorrect.`);
          }
        } catch (e) {
          return message.channel.send(`You did not answer!`);
    };
      }

      
      case 'cars': {
				let qcar = questionscars[Math.floor(Math.random() * questionscars.length)];
        let icar = 0;
        const Embed = new MessageEmbed()
          .setTitle(qcar.title)
          .setDescription(
            qcar.options.map((opt) => {
              icar++;
            return `${icar} - ${opt}\n`;
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
          if (parseInt(msgs.first().content) == qcar.correct) {
            return message.channel.send(`You got it correct!`)
          } else {
            return message.channel.send(`You got it incorrect.`);
          }
        } catch (e) {
          return message.channel.send(`You did not answer!`);
    };
  }



      case 'games': {
        let qgame = questionsgame[Math.floor(Math.random() * questionsgame.length)];
        let igame = 0;
        const Embed = new MessageEmbed()
          .setTitle(qgame.title)
          .setDescription(
            qgame.options.map((opt) => {
              igame++;
              return `${igame} - ${opt}\n`;
            })
          )
          .setColor(`GREEN`)
          .setFooter(`Reply to this message with the correct question number¬ You have 15 seconds.`);
        message.channel.send(Embed);
        try {
          let msgs = await message.channel.awaitMessages((u2) => u2.author.id === message.author.id, {
            time: 15000,
            max: 1,
            errors: ["time"]
          });
          if (parseInt(msgs.first().content) == qgame.correct) {
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
  
};