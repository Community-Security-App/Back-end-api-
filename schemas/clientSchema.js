var mongoose = require('mongoose')
var Schema - mongoose.Schema;


var clientSchema = Schema ({
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

