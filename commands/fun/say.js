const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "fun",
    cooldown: 3,
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
        if (message.deletable) message.delete();

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));


        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor("RANDOM");

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}