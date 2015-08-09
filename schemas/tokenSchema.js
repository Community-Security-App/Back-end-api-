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

module.exports = mongoose.model('Token', TokenSchema);