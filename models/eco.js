const mongoose = require('mongoose');

const ecoSchema = new mongoose.Schema({
	_id: { type: String },
	Money: { type: Number },
	GuildID: { type: String },
});

const MessageModel = module.exports = mongoose.model('eco', ecoSchema);