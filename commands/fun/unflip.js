module.exports = {
    name: "tableunflip",
    category: "fun",
    cooldown: 3,
    aliases: ["unflip"],
    description: "unflips a tabele",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        message.channel.send("┬─┬ ノ( ゜-゜ノ)")
    }
}