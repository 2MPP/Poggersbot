const mongoose = require('mongoose');

const WarnSchema = new mongoose.Schema({
	Id: { type: String },
	Moderator: { type: String },
	Reason: { type: String },
	User: { type: String },
	Time: { type: Date },
});

const MessageModel = module.exports = mongoose.model('Warns', WarnSchema);