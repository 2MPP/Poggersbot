const {
	MessageEmbed
} = require('discord.js');

module.exports = {
	name: 'ping',
	cooldown: 3,
	description: 'This is a ping command!',
	run: async (client, message, args) => {
    
    const embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("Tada - Ping")
    .setDescription(`Ping: ${Math.round(client.ws.ping)}ms`)
    .setTimestamp()
    message.channel.send(embed)
}};