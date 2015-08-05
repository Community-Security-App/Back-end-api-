var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')
var Schema   = mongoose.Schema


//User Schema to create the models from 
//TODO: Make sure that the type is accurate
var userSchema = new Schema({
	first_name: String,
	last_name:  String,
	email: String,
	password: {
        type: String,
        require : true
    },
    username: {
        type: String,
        require: true
    },
	is_staff: Boolean,
	is_superuser: Boolean,
	is_active: Boolean,
	last_login: Date,
	date_joined: Date
});

//This will be executed each time before save
userSchema.pre('save', function(callback) {
    var user = this;

    //Password has not changed
    if (!user.isModified('password'))
    return callback();

    //Password has changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt){
        if(err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return callback(err);

            user.password = hash;
            callback();
        });
    });

});

//To verify the user passwords 
userSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch){
        if (err) return callback(err);
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema);

