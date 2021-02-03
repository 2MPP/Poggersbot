const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "skip",
  category: "music",
  description: "Skips current song",
  run: async (client, message, args) => {

    const player = message.client.manager.players.get(message.guild.id);
    const queue = player.queue;

    if (!player) return message.reply("I have not joined a channel because I have nothing to play. Use the play command to play the song.");
    if (!player.playing) player.playing = true;

    await message.react("⏮");
    player.stop();
  }
}