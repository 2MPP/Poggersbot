module.exports = {
	name: 'reload',
	category: 'owner-bot',
	description: 'reload a specified command',
	run: async (client, message, args) => {
		if(message.author.id !== '251428574119067648') {
			if(message.author.id !== '405771597761216522') {
			message.channel.send('This command was not made for u SHHHH');
		}
	}
		const cmdToUpdate = args[0];
		const cmd = client.commands.get(cmdToUpdate.toLowerCase()) || client.commands.get(client.aliases.get(cmdToUpdate.toLowerCase()));
		if (!args.length) {
			message.channel.send('Nothing to say?');
		}

		delete require.cache[require.resolve(`./${cmd.name}.js`)];
		try {
			const newCommand = require(`./${cmd.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);~message.channel.send(`successfully reloaded ${cmd.name}.js`);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${cmd.name}\`:\n\`${error.message}\``);
		}

	},
};