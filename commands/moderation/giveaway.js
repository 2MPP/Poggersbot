const {
  MessageEmbed
} = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "giveaway",
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id !== '251428574119067648') {
      return message.reply('❌   **You do not have permissions to start a giveaway.**')
        .then(m => m.delete({
          timeout: 5000,
          reason: 'Auto message timeout'
        }));
    }

    if (!args[0]) return message.channel.send(`You did not specify your time!`);
    if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m") && !args[0].endsWith("s"))
      return message.channel.send(`You did not use the correct formatting for the time!`);

    if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
    let channel = message.mentions.channels.first();

    if (!channel)
      return message.channel.send(`I could not find that channel in the guild!`);
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);
    message.channel.send(`*Giveaway created in ${channel}*`);

    let Embed = new MessageEmbed()
      .setTitle(`New giveaway!`)
      .setDescription(`The user ${message.author} is hosting a giveaway for the prize of: \n \n **${prize}**`)
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`BLUE`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(`Not enough people reacted for me to start draw a winner!`);
      }

      let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
      channel.send(`The winner of the giveaway for **${prize}** is... ${winner}`);
    }, ms(args[0]));
  },
};