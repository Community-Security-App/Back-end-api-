var uEvent = require('../schemas/eventsSchema');

//Adds a particular event
exports.postEvents = function(req, res) {

    var newEvent = new uEvent();

    newEvent.description = req.body.description,
    newEvent.threatLevel = req.body.threatLevel,
    newEvent.location    = req.body.location,
    newEvent.latitude    = req.body.latitude,
    newEvent.longitude   = req.body.longitude,
    newEvent.occurenceTime = req.body.occurenceTime,
    newEvent.reportedTime  = new Date(),
    newEvent.reportedBy = req.user._id,
    newEvent.upvoteCount   = req.body.upvoteCount,
    newEvent.downvoteCount = req.body.downvoteCount,
    newEvent.flagCount     = req.body.flagCount,
    newEvent.deleted       = req.body.deleted,
    newEvent.flagged      = req.body.flagged

    newEvent.save(function(err) {
        if (err)
            res.send(err);

        res.json({"success" : 1});

    });
};

// Returns all the events 
exports.getEvents = function(req, res) {

    uEvent.find(function (err, uevent) {
        if(err)
            res.send(err);

        res.json(uevent);
    });
};

//returns event by a certain ID
exports.getEventById = function(req, res) {
    uEvent.findById(req.params.id, function(err, uevent) {
        if(err)
            res.send(err);

        res.json(uevent);

    });
}

//Returns events that have been posted by a certain user
exports.getEventByUser = function(req, res) {

}
//Returns all the latest events 
exports.getLatestEvents = function(req, res) {

}
//Returns all the flags of a certain event
exports.getEventFlags = function(req, res) {

}
//Returns a flag with a particular ID in an event 
//Returns all the votes on a certain event 
exports.getEventVotes = function(req, res) {
    
}
//Returns a vote with a particular Id in an event 
//Returns all the comments in a particular event 
//Returns a comment with a particular Id  in an event
//Returns events near a certain location 
//Delete a comment 
//Deletes an event report --> Make sure it
