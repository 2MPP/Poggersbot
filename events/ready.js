const Statcord = require('statcord.js');

module.exports = async (client) => {

	const statcord = new Statcord.Client({
		client,
		key: 'statcord.com-lqDZFFZcjD7jBqnAYMEb',
		postCpuStatistics: true,
		postMemStatistics: true,
		postNetworkStatistics: true,
	});
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
					client.channels.cache.get('733621857261191179').send('changes to the github detected \`\`\`\n' + response + '\n\n\`\`\` make sure to restart the bot');
				}
			}
		});
	}, 30000);

};