//TODO: Add better documentation for this schema
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var eventSchema = new Schema({
    description = String, 
    threatLevel = enum, 
    location    = String,
    latitude    = float,
    longitude   = float,
    occurenceTime = Date,
    reportedTime  = Date,
    //reported_by (FK, User)
    upvoteCount   = int,
    downvoteCount = int,
    flagCount     = int
    deleted       = boolean,
    flagged       = boolean
}); 

module.exports = eventSchema;