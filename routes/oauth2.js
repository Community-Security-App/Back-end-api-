var oauth2orize = require('oauth2orize')
var user = require('../schemas/userSchema')
var Client = require('../schemas/clientSchema')
var token = require('../schemas/tokenSchema')
var Code = require('../schemas/codeSchema')
var uid = require('rand-token').uid

//Create the oauth2orize
var server = oauth2orize.createServer();


//serilize function
server.serializeClient(function(client, callback) {
	//TODO: Remove this soonest possible 
	//console.log(client)
	console.log("This is serialize")
	return callback(null, client._id)
})

//Deserialize function 
server.deserializeClient(function(id, callback) {
	Client.findOne({_id: id}, function (err, client) {
		if (err) {return callback(err); }
		//TODO: Make sure to remove this
		//console.log("Found a client in auth dese")
		//console.log(client)
		console.log("This is deserialize")
		return callback(null, client);

	});
});

server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {

	var newCode = new Code();
		
		newCode.value = uid(16);
		newCode.clientId = client._id; 
		newCode.redirectUri =redirectUri;
		newCode.userId = user._id;
		console.log(newCode)
		console.log("Was the new code ever generated?");

	newCode.save(function(err) {
		if (err) {return callback(err); }
		console.log(newCode)
		console.log("This is the new code which has been generated"); 
		callback(null, newCode.value);
	});
}));

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
	Code.findOne({value: code}, function (err, authCode) {
		
		//TODO: Make sure to remove this
		console.log(authCode);
		console.log("This is the authocode")

		if (err) { return callback(err); }
		if (authCode == undefined) { return callback(null, false); }
		if (client._id.toString() !== authCode.clientId) {
			console.log("Got suck in to string")
			return callback(null, false); }
		if (redirectUri != authCode.redirectUri) {
			console.log("Got stuck in the redirect URI")
			return callback(null, false); }

		authCode.remove(function (err) {
			if(err) {return callback(err); }

			var newToken = new token({
				value: uid(256),
				clientId: authCode.clientId, 
				userId: authCode.userId
			});

			newToken.save(function (err) {
				if (err) {return callback(err); }

				console.log("Token has been returned with the callback")
				console.log(newToken)
				callback(null, newToken);
			});
		});
	});
}));

exports.authorization = [
	server.authorization(function(clientId, redirectUri, callback) {
		Client.findOne({id: clientId}, function (err, client) {
			if (err) {return callback(err); }
			//TODO: remove this 
			//console.log("This is where we export authorization")
			//console.log(client)
			return callback(null, client, redirectUri);
		});
	}),
	function(req, res) {
		console.log({transactionID: req.oauth2.transactionID, user:req.user, client:req.oauth2.client})
		res.render('dialog', {transactionID: req.oauth2.transactionID, user:req.user, client:req.oauth2.client});
	}]

exports.decision = [
		server.decision()
]

exports.token = [
	server.token(),
	server.errorHandler()
	]
