const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "loop",
  category: "music",
  description: "Loop the current playlist",
  run: async (client, message, args) => {

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.reply("I have not joined a channel because I have nothing to play. Use the play command to play the song.");

    const {
      channel
    } = message.member.voice;

    if (!channel) return message.reply("You need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");

    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "Enabled" : "Disabled";
      const loop = new MessageEmbed()
        .setColor('#FFD700')
        .setDescription(`${queueRepeat} queue repeat.`)
      return message.reply(loop);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
    const loop = new MessageEmbed()
      .setColor('#FFD700')
      .setDescription(`${trackRepeat} track repeat.`)
    return message.reply(loop);
  }
}