var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TokenSchema = new Schema({
	value: {
		type: String, 
		require: true
	},
	userID: {
		type: String, 
		require: true
	},
	clientId: {
		type: String, 
		require: true

	}
});

// TODO: Hashing of the value of the token in the schema 


module.exports = mongoose.model('Token', TokenSchema);