const mongoose = require('mongoose');

const Note = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: false
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	}
});

module.exports = mongoose.model('Note', Note);
