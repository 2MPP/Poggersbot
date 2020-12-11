const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    category: "music",
    description: "shuffles the queue",
    run: async (client, message, args) => {

      const player = message.client.manager.players.get(message.guild.id);
        
      const { channel } = message.member.voice;
      
      if (!channel) return message.reply('You need to join a voice channel.');
      
      if(!player || !player.queue[0]) return message.channel.send("No song is currently playing in this guild.");
      
      player.queue.shuffle();
      
      return message.channel.send("The queue is now shuffled.");
  }
}