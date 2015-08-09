var mongoose = require('mongoose')

var clientSchema = new mongoose.Schema({
	name: {
		type: String, 
		unique: true,
		require: true
	},
	id: {
		type: String,
		require: true
	},
	secret: {
		type: String,
		require: true
	},
	userId: {
		type: String, 
		require: true
	}
})

module.exports = mongoose.model('Client', clientSchema)

