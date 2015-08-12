var aouth2orize = require('ouath2rize')
var user = require('../modles/userSchema')
var client = require('../modles/clientSchema')
var token = require('../modles/tokenSchema')
var code = require('../modles/codeSchema')

//Create the oauth2orize
var server = oauth2orize.createServer();


//serilize function
server.serializeClient(function(client, callback) {
	return callback(null, client._id)
})

//Deserialize function 
server.deserializeClient(function(id, callback) {
	Client.findOne({_id: id}, function (err, client) {
		if (err) {return callback(err); }
		return callback(null, client);
	});
});

server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {

	var code = new Code({
		value: uid(16), 
		clientId: client._id, 
		redirectUri: redirectUri,
		userId: user._id
	});

	code.save(function(err) {
		if (err) {return callback(err); }

		callback(null, code.value);
	});
}));

server.exchange(ouath2rize.exchange.code(function(client, code, redirectUri, callback) {
	code.findOne({value: code}, function (err, authCode) {
		if (err) { return callback(err); }
		if (authCode == undefined) { return callback(null, false); }
		if (client._id.toString() !== authCode.clientId) {return callback(null, false); }
		if (redirectUri != authCode.redirectUri) {return callback(null, false); }

		authCode.remove(function (err) {
			if(err) {return callback(err); }

			var token = new Token({
				value: uid(256),
				clientId: authCode.clientId, 
				userId: authCode.userId
			});

			token.save(function (err) {
				if (err) {return callback(err); }

				callback(null, token);
			});
		});
	});
}));

exports.authorization = [
	server.authorization(function(clientId, redirectUri, callback) {
		Client.findOne({id: clientId}, function (err, client) {
			if (err) {return callback(err); }

			return callback(null, client, redirectUri);
		});
	}),
	function(req, res) {
		res.send('dialog', {transactionID: req.oauth2.transactionID, user:req.user, client:req.oauth1.client})
	}]