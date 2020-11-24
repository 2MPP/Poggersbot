const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
	Channel: {
		type: String,
	},
	GuildID: String,
});

const MessageModel = module.exports = mongoose.model('logs', ChannelSchema);