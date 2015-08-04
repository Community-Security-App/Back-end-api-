var mongoose = require('mongoose')
var Schema   = mongoose.Schema


//User Schema to create the models from 
//TODO: Make sure that the type is accurate
var userSchema = new Schema({
	first_name: String,
	last_name:  String,
	email: String,
	password: String,
	is_staff: Boolean,
	is_superuser: Boolean,
	is_active: Boolean,
	last_login: Date,
	date_joined: Date
});

module.exports = mongoose.model('user', userSchema);

