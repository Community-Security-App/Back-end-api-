var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')
var Schema   = mongoose.Schema


//User Schema to create the models from 
//TODO: Make sure that the type is accurate
var userSchema = new Schema({
	firstName: String,
	lastName:  String,
	email: String,
	password: {
        type: String,
        require : true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
	isStaff: Boolean,
	isSuperuser: Boolean,
	isActive: Boolean,
	lastLogin: Date,
	dateJoined: Date
});

//TODO: The date joined and the last login functions should be implemented
//This will be executed each time before save
userSchema.pre('save', function(callback) {
    var user = this;
    console.log(user)
    //Password has not changed
    if (!user.isModified('password'))
    return callback();

    //Password has changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt){
        if(err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return callback(err);
            console.log(user.password)

            user.password = hash;
            callback();
        });
    });

});

//To verify the user passwords 
userSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch){
        if (err) return callback(err);
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema);

