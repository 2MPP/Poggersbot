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

};