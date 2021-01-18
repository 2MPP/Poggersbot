const mongoose = require('mongoose');

const AntiSpam = new mongoose.Schema({
	GuildID: { type: String },
	Enable: { type: String },
});

const MessageModel = module.exports = mongoose.model('antispam', AntiSpam);