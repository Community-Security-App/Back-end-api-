var client = require('../schemas/clientSchema')

exports.postClients = function(req, res) {

	var newClient = new client();

	newClient.name = req.body.name;
	newClient.id = req.body.id;
	newClient.secret = req.body.secret;
	newClient.userId = req.user._id;

 	//TODO: Do the saving of the client 

 	newClient.save(function (err) {
 		if (err)
 			res.send(err);

 		res.json({"message" : "Client added"})
 	})

}

exports.getClients = function(req, res) {

	client.find({userId: req.user._id}, function(err, clients) {
		if (err)
			res.send(err);

		res.json(clients)
	});



//Use the find function from the model to tind all clients
};