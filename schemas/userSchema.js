var mongoose = require('mongoose')
var Schema   = mongoose.Schema


//User Schema to create the models from 
//TODO: Make sure that the type is accurate
var userSchema = new Schema({
	_id : String,
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


// We need methods which will interact with the data e.g

// Before save if this function is run 
/*userSchema.pre('save', function(next){

	if(!date_joined)
		this.date_joined = new Date()
	
	next();
}) */
// We will need a method which will hash the password before storage
var User = mongoose.model('User', userSchema)

module.exports = User;

