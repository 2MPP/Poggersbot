const {
	MessageEmbed
} = require('discord.js');

let questionsgeneral = [{

  title: "What was the most expensive film?",
  options: ["Avengers: Age of Ultron", "Avengers: Endgame", "Avengers: Infinity War", "Pirates of the Caribbean: On Stranger Tides", "Pirates of the Caribbean: At World's End", "Star Wars: The Rise of Skywalker", "Spider-Man 3"],
  correct: 4
}

];


module.exports = {
	name: 'currytest',
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
        }
    }
}
}
}