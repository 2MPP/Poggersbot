const mongoose = require('mongoose');

const WarnSchema = new mongoose.Schema({
	GuildID: { type: String },
	Id: { type: String },
	Moderator: { type: String },
	Reason: { type: String },
	User: { type: String },
	_id: { type: String },
	Time: { type: Date },
});

const MessageModel = module.exports = mongoose.model('Warns', WarnSchema);