var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* Authorization codes are generated in the first part of the oauth2 flow 
*/
var codeSchema = new Schema({
	value : {
		type: String, 
		require: true
	},
	redirectUri: {
		type: String,
		require: true 
	},
	userId: {
		type: String, 
		require: true
	},
	clientId: {
		type: String, 
		require: true
	}
})

module.exports = mongoose.model('Code', codeSchema);