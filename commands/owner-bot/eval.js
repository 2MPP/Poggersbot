const fs = require('fs');
const Discord = require('discord.js');
const execSync = require('child_process').execSync;


module.exports = {
	name: 'eval',
	aliases: [],
	category: 'owner-bot',
	description: 'Run some eval code',
	usage: '<input>',
	run: (client, message) => {
		if (message.author.id !== '251428574119067648') {
			if (message.author.id !== '530367361224540190') {
				if (message.author.id !== '405771597761216522') {
					return message.channel.send('Only my owner can use this.');
				}
			}
		}

		function clean(text) {
			if (typeof (text) === 'string') {
				return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
			}
			return text;
		}

		function clean(text) {
			if (typeof text !== 'string') {text = require('util').inspect(text, { depth: 0 });}
			const rege = new RegExp(client.token, 'gi');
			const rege1 = new RegExp(9 + 10, 'gi');
			const rege2 = new RegExp(69 + 69, 'gi');
			text = text
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203))
				.replace(rege, '404')
				.replace(rege1, '21')
				.replace(rege2, '666');
			return text;
		}
		const args = message.content.split(' ').slice(1);
		const cont = message.content.split(' ').slice(1).join(' ');
		message.channel.send('Evaluating...').then(msg => {
			try {
				const code = args.join(' ');
				let evaled = eval(code);

				if (typeof evaled !== 'string') {
					evaled = require('util').inspect(evaled);
				}
				if (evaled.length > 2000) {
					try {
						const evalcode1 = new Discord.Ri()
							.setAuthor(`Eval by ${message.author.tag}`, 'https://cdn.discordapp.com/emojis/314405560701419520.png')
							.setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
							.addField('\u200b', '**Output:**\n\n```Output too long, logged to eval.txt', true)
							.setColor(0x00FF00)
							.setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`);
						msg.edit({
							embed: evalcode1,
						}), fs.writeFile('eval.txt', `${clean(evaled)}`), message.channel.send('Eval output', { files: ['eval.txt'] });
						return fs.writeFile('eval.txt', `${clean(evaled)}`);
					}
					catch (err) {
						const errorcode1 = new Discord.MessageEmbed()
							.setAuthor(`Eval by ${message.author.tag}`, 'https://cdn.discordapp.com/emojis/314405560701419520.png')
							.setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
							.addField('\u200b', `**Output:**\n\n\`\`\`js\nOutput too long, logged to ${__dirname}\\eval.txt\`\`\``, true)
							.setColor(0xFF0000)
							.setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms `, 'https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus');
						msg.edit({
							embed: errorcode1,
						});
						return fs.writeFile('eval.txt', `${clean(err)}`);
					}
				}
				const evalcode = new Discord.MessageEmbed()
					.setAuthor(`Eval by ${message.author.tag}`, 'https://cdn.discordapp.com/emojis/314405560701419520.png')
					.setDescription(`**:inbox_tray: Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
					.addField('\u200b', `**:outbox_tray: Output:**\n\n\`\`\`js\n${clean(evaled)}\`\`\``, true)
					.setColor(0x00FF00)
					.setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`);
				msg.edit({
					embed: evalcode,
				}).catch(e => logger.error(e));
			}
			catch (err) {
				const errorcode = new Discord.MessageEmbed()
					.setAuthor(`Eval by ${message.author.tag}`, 'https://cdn.discordapp.com/emojis/314405560701419520.png')
					.setDescription(`**:inbox_tray: Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
					.addField('\u200b', `**:outbox_tray: Output:**\`\`\`js\n${clean(err)}\`\`\``, true)
					.setColor(0xFF0000)
					.setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} `);
				msg.edit({
					embed: errorcode,
				}).catch(e => logger.error(e));
			}
		});
	} };