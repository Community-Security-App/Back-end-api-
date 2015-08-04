//TODO: Add better documentation for this schema
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var eventSchema = new Schema({
    description : String, 
    threatLevel : Number, 
    location    : String,
    latitude    : Number,
    longitude   : Number,
    occurenceTime : Date,
    reportedTime  : Date,
    //reported_by (FK, User)
    upvoteCount   : Number,
    downvoteCount : Number,
    flagCount     : Number,
    deleted       : Boolean,
    flagged       : Boolean
}); 

module.exports = mongoose.model('event', eventSchema);