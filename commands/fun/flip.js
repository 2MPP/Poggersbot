module.exports = {
    name: "tableflip",
    category: "fun",
    cooldown: 3,
    aliases: ["flip"],
    description: "flips a tabele",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        message.channel.send("(╯°□°）╯︵ ┻━┻")
    }
}