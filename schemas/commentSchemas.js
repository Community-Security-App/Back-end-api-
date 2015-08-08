var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var commentAction = new Schema({

	uEvent = String, 
	value = String, 
	commentTime = Date, 
	commentBy = String, 
	upVoteCount = Number, 
	downVoteCount = Number, 
	flagCount = Number, 
	Deleted = Boolean, 
	Flagged = Boolean
});

module.exports = mongoose.model("commentAction", commentAction);