const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const log = console.log;
const Statcord = require('statcord.js');
const chalk = require('chalk');
const prefix = require('./models/prefix')

const client = new Client({
	fetchAllMembers: true,
	disableMentions: 'everyone',
	messageCacheLifetime: 180,
	messageCacheMaxSize: 200,
	messageSweepInterval: 180,
	ws:{
		intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'],
	} });

const statcord = new Statcord.Client({
	client,
	key: 'statcord.com-lqDZFFZcjD7jBqnAYMEb',
	postCpuStatistics: true,
	postMemStatistics: true,
	postNetworkStatistics: true,
});

// statscord auto post
statcord.on('autopost-start', () => {
	// Emitted when statcord autopost starts
	console.log('Started autopost');
});

statcord.on('post', status => {
	// status = false if the post was successful
	// status = "Error message" or status = Error if there was an error
	if (!status) console.log('Successful post');
	else console.error(status);
});


client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./mongoose');
client.categories = fs.readdirSync('./commands/');

config({
	path: __dirname + '/.env',
});


['command'].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

const cooldowns = new Collection();

// event handler
fs.readdir('./events', (err, files) => {
	files = files.filter(f => f.endsWith('.js'));
	files.forEach(f => {
		const event = require(`./events/${f}`);
		client.on(f.split('.')[0], event.bind(null, client));
		delete require.cache[require.resolve(`./events/${f}`)];
	});
});


client.on('UnhandledPromiseRejectionWarning', () => console.log());

var userID = [];

setInterval(() => {
	userID = [];
}, 15000);

const antispam = require('./models/antispam')
client.on('message', async message => {
	if(message.author.bot) return;
	if (message.channel.type == 'dm') return;
	if (message.member.hasPermission('ADMINISTRATOR')) return;
	const data = await antispam.findOne({
		GuildID: message.guild.id,
	});
	if(!data) return;

	if(data.Enable == 'enable') {
		userID.push(message.author.id);
		const result = userID.filter(x => x == message.author.id).length;

		if(result == 10) {
			message.channel.send('Warning Please stop spamming');
		}
		if(result == 15) {
			const Member = message.guild.members.cache.get(message.author.id);
			if (!Member.kickable) {return;}
			message.channel.send(`${message.author.tag} has been kicked`);
			Member.kick('AntiSpam');
		}

		if(result == 20) {
			const Member = message.guild.members.cache.get(message.author.id);
			if (!Member.banable) {return;}
			message.channel.send('User has been ban');
			Member.ban({ days: 7, reason: 'AntiSpam' });
		}
	}
	else {return;}
});


client.on('message', async message => {
	if (!message.guild) return;
	if (message.author.bot) return;
	const data = await prefix.findOne({
		GuildID: message.guild.id,
	});
	if (message.content.startsWith('<@!778411215470067732>')) {
		message.reply(`My server prefix is **${data.Prefix}** use **${data.Prefix}**help for a list of commands \n You can change this with **${data.Prefix}**setprefix`);
	}
	if (message.content.startsWith('<@778411215470067732>')) {
		message.reply(`My server prefix is **${data.Prefix}** use **${data.Prefix}**help for a list of commands \n You can change this with **${data.Prefix}**setprefix`);
	}


	if(data) {
		const prefix = data.Prefix;

		if (message.content.startsWith(prefix)) {
			log(chalk.blue('[Discord Command]') + chalk.red(' The command ') + chalk.cyan.bold(`${message.content}`) + chalk.green(` Was used by ${message.author.username}#${message.author.discriminator} (${message.author.id})`));
		}

		if (!message.content.startsWith(prefix)) return;
		if (!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);

		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return;
		let command = client.commands.get(cmd);

		try {
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Collection());
			}
			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
				}
			}
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		}
		catch (error) {
			console.log();
		}

		if (!command) command = client.commands.get(client.aliases.get(cmd));
		if (command) {command.run(client, message, args);}
		statcord.postCommand(command.name, message.author.id);
	}
	else if (!data) {

		const prefix = 'p!';

		if (message.content.startsWith(prefix)) {
			log(chalk.blue('[Discord Command]') + chalk.red(' The command ') + chalk.cyan.bold(`${message.content}`) + chalk.green(` Was used by ${message.author.username}#${message.author.discriminator} (${message.author.id})`));
		}

		if (!message.content.startsWith(prefix)) return;
		if (!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return;
		let command = client.commands.get(cmd);


		try {
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Collection());
			}
			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
				}
			}
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		}
		catch (error) {
			console.log();
		}

		if (!command) command = client.commands.get(client.aliases.get(cmd));
		if (command) {command.run(client, message, args);}
		statcord.postCommand(command.name, message.author.id);
	}
});


(async () => {
	client.mongoose.init();
	const { Manager } = require('erela.js');

	await client.login(process.env.token);


	// =================================== MUSIC STUFF =============================================

	const nodes = [
		{
			host: 'lava2.danbot.host',
			password: 'DBH',
			port: 2333,
			retryAmount: -1,
			retryDelay: 30e3,
		},
	];


	client.manager = new Manager({
		nodes,
		autoPlay: true,
		send: (id, payload) => {
			const guild = client.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		},
	});

	client.manager.init(client.user.id);
	console.log(`Logged in as ${client.user.tag}`);

	client.manager.on('nodeConnect', node => {
		console.log(`Node "${node.options.identifier}" connected.`);
	});

	client.manager.on('nodeError', (node, error) => {
		console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
	});

	client.on('raw', d => client.manager.updateVoiceState(d));

	client.manager.on('trackStart', (player, track) => {
		const Discord = require('discord.js');
		const embed = new Discord.MessageEmbed()
			.setDescription(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`)
			.setColor('#FFD700');

		const channel = client.channels.cache.get(player.textChannel);
		channel.send(embed).then(msg => {
			msg.delete({ timeout: track.duration });
		});

	});

	// Emitted the player queue ends
	client.manager.on('queueEnd', player => {
		const channel = client.channels.cache.get(player.textChannel);
		channel.send('Queue has ended.');
		player.destroy();
	});
})();