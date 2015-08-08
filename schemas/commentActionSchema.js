var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentAction = new Schema({
	comment = String, 
	actionType = String, 
	note = String, 
	actionBy = String, 
	ActionTime = Date
});
