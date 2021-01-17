const { Client, Collection, MessageEmbed, APIMessage } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const log = console.log;
const Statcord = require('statcord.js');
const chalk = require('chalk');
// MongoDb models only
const prefix = require('./models/prefix');
const logs = require('./models/channel');
const welcome = require('./models/welcome');
const warn = require('./models/warn');
const eco = require('./models/eco');
// end of MogoDB stuff
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

client.on('ready', async () => {
	statcord.autopost();

	const activities = [
		{
			'text': 'Use p! For more info',
			'type': 'WATCHING',
			'status': 'online',
		},
		{
			'text': 'In ' + (Math.ceil(client.guilds.cache.size)) + ' servers.',
			'type': 'PLAYING',
			'status': 'online',
		},
		{
			'text': 'Thanks for the love you all gave the bot',
			'type': 'PLAYING',
			'status': 'online',
		},
		{
			'text': 'More economy commands coming out at some point',
			'type': 'PLAYING',
			'status': 'online',
		},
	];

	setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setPresence({ activity: { name: activity.text }, status: activity.status });
	}, 10000);

	client.api.applications(client.user.id).guilds('625589494145482762').commands.post({
		data: {
			name: 'hello',
			description: 'Just repsonds hello',
		},
	});

	client.api.applications(client.user.id).guilds('625589494145482762').commands.post({
		data: {
			name: 'embed',
			description: 'sends a embed',
			options: [
				{
					name: 'title',
					description: 'Title of the embed',
					type: 3,
					required: true,
				},
				{
					name: 'content',
					description: 'Content in the message',
					type: 3,
					required: true,
				},
				{
					name: 'colour',
					description: 'colour of the embed',
					type: 3,
					required: true,
				},
			],
		},
	});


});

client.ws.on('INTERACTION_CREATE', async i => {
	const command = i.data.name.toLowerCase();
	const options = i.data.options;


	if (command === 'hello') {
		client.api.interactions(i.id, i.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'hi!',
				},
			},
		});
	}

	if (command === 'embed') {
		const title = options.find(option => option.name === 'title').value;
		const content = options.find(option => option.name === 'content').value;
		const colour = options.find(option => option.name === 'colour').value;

		const embed = new MessageEmbed()
			.setTitle(title)
			.setDescription(content)
			.setColor(colour.toUpperCase());

		const apiMessage = await APIMessage.create(client.channels.resolve(i.channel_id), embed).resolveData().resolveFiles();
		client.api.interactions(i.id, i.token).callback.post({
			data: {
				type: 4,
				data: apiMessage.data,
			},
		});
	}

});


client.on('UnhandledPromiseRejectionWarning', () => console.log());
// start of events

// dms on add server
client.on('guildCreate', async guild => {

	client.users.fetch('251428574119067648', false).then(user => {

		const uwu = new MessageEmbed()
			.setTitle('**New server UwU**')
			.setColor('#FFC0CB')
			.setDescription(`I was added to **${guild.name}** \n Server count is now ${client.guilds.cache.size} \n Guild id is ${guild.id} \n Server has ${guild.members.cache.size} Members`);
		user.send(uwu);
	});
});


client.on('guildDelete', async guild => {
	client.users.fetch('251428574119067648', false).then(user => {
		const uwu = new MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);


	});
	await logs.deleteOne({ GuildID: guild.id });
	await welcome.deleteOne({ GuildID: guild.id });
	await prefix.deleteOne({ GuildID: guild.id });
	await warn.deleteMany({ GuildID: guild.id });
	await eco.deleteMany({ GuildID: guild.id });
});


client.on('guildCreate', async guild => {

	client.users.fetch('405771597761216522', false).then(user => {

		const uwu = new MessageEmbed()
			.setTitle('**New server UwU**')
			.setColor('#FFC0CB')
			.setDescription(`I was added to **${guild.name}** \n Server count is now ${client.guilds.cache.size} \n Guild id is ${guild.id} \n Server has ${guild.members.cache.size} Members`);
		user.send(uwu);
	});
});

client.on('guildDelete', async guild => {
	client.users.fetch('405771597761216522', false).then(user => {
		const uwu = new MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);

	});
});

client.on('messageDelete', async message => {
	if(message.author.bot) return;
	const data = await logs.findOne({
		GuildID: message.guild.id,
	});

	if(data) {
		const loggs = client.channels.cache.get(data.Channel);
		const Message = new MessageEmbed()
			.setColor('36393F')
			.setTitle(`Deleted Message | ${message.author.username}`)
			.setDescription('**Message Content**: \n ' + message.content);
		loggs.send(Message);
	}
	else if(!data) {
		return;
	}
});


client.on('guildMemberAdd', async member => {
	const data = await welcome.findOne({
		GuildID: member.guild.id,
	});
	if(data) {
		const welcome2 = client.channels.cache.get(data.Channel);
		const mkk = new MessageEmbed()
			.setTitle('**Welcome!**\n')
			.setColor('RANDOM')
			.setThumbnail(member.user.avatarURL())
			.setDescription(`welcome to **${member.guild.name}**, ${member}. \n **make sure to read the rules!**`)
			.setTimestamp()
			.setFooter(`Member count ${member.guild.memberCount}`);
		welcome2.send(mkk);
	}
	else if(!data) {
		return;
	}
});


// end off events

// github pull
const exec = require('child_process').exec;
setInterval(() => {
	exec('git pull', (error, stdout) => {
		const response = (error || stdout);
		if (!error) {
			if (response.includes('Already up to date.')) {
			//	console.log('Bot already up to date. No changes since last pull');
			}
			else {
				console.log('pulled');
				client.channels.cache.get('733621857261191179').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + '```' + '\n\n\n**Restarting bot**');
			}
		}
	});
}, 30000);


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
			host: 'antifurry-lavalink.herokuapp.com',
			password: 'AntiFurry',
			port: 80,
			retryAmount: 280,
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