var mongoose = require('mongoose')
var schema = mongoose.schema



//TODO: Give them the proper types for each type of event 

var eventAction = new schema({
	eventT = String, 
	actionType = String,
	note = String,
	actionBy = String, 
	actionTime = Date, 
})


module.exports = mongoose.model('Uevent', eventAction)