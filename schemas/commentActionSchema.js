var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentAction = new Schema({
	commentId = String, // This is a foreign key 
	actionType = String, 
	note = String, 
	actionBy = String, 
	ActionTime = Date
});
