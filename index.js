const { Client, Collection, MessageEmbed } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const log = console.log;
const chalk = require('chalk');
// MongoDb models only
const prefix = require('./models/prefix');


// end of MogoDB stuff
const client = new Client({ disableMentions: 'everyone',
	ws:{
		intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES' ],
	} });


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


client.on('ready', async () => {


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
	];

	setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setPresence({ activity: { name: activity.text }, status: activity.status });
	}, 10000);
});


client.on('UnhandledPromiseRejectionWarning', () => console.log());


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

client.on('guildDelete', guild => {
	client.users.fetch('251428574119067648', false).then(user => {
		const uwu = new MessageEmbed()
			.setTitle('**Removed**')
			.setDescription('I was removed from **' + guild.name + `**\n Server count is now ${client.guilds.cache.size}`);
		user.send(uwu);
	});
});

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
				client.channels.cache.get('686618499145400362').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + '```' + '\n\n\n**Restarting bot**');
			}
		}
	});
}, 30000);


client.on('message', async message => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (message.content.startsWith('<@!778411215470067732>' || '<@778411215470067732>')) {
		message.reply(`My server prefix is **${prefix}** use **${prefix}**help for a list of commands \n You can change this with **${prefix}**setprefix`);
	}

	const data = await prefix.findOne({
		GuildID: message.guild.id,
	});

	if(data) {
		const prefix = data.Prefix;
		if (!message.content.startsWith(prefix)) return;
		if (!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return;
		let command = client.commands.get(cmd);
		if (!command) command = client.commands.get(client.aliases.get(cmd));
		if (command) {command.run(client, message, args);}
		log(chalk.blue('[Discord Command]') + chalk.red(' The command ') + chalk.cyan.bold(`${command.name}`) + chalk.green(` Was used by ${message.author.username}#${message.author.discriminator} (${message.author.id})`));
	}
	else if (!data) {

		const prefix = 'p!';

		if (!message.content.startsWith(prefix)) return;
		if (!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return;
		let command = client.commands.get(cmd);
		if (!command) command = client.commands.get(client.aliases.get(cmd));
		if (command) {command.run(client, message, args);}
		log(chalk.blue('[Discord Command]') + chalk.red(' The command ') + chalk.cyan.bold(`${command.name}`) + chalk.green(` Was used by ${message.author.username}#${message.author.discriminator} (${message.author.id})`));
	}
});


client.login(process.env.token);
client.mongoose.init();
console.log('Im online u big gay');