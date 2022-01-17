function (param1, param2, filedata, callback)
{
	if (!param1.token) {
		param1.token = dropbox.accessToken;
	}
	if (!param1.tokenSecret) {
		param1.tokenSecret = dropbox.accessTokenSecret;
	}
	
	//If type isn't defined, it's JSON
	//if (!param1.type) {
	//	param1.type = "json";
	//}
	
	//If method isn't defined, assume it's GET
	if (!param1.method) {
		param1.method = "PUT";
	}

	//Define the accessor
	accessor = {
		consumerSecret: dropbox.consumerSecret,
	};
	
	//Outline the message
	message = {
		action: escape(param1.url),
	    method: param1.method,
	    parameters: [
	      	["oauth_consumer_key", dropbox.consumerKey],
	      	["oauth_signature_method","PLAINTEXT"]
	  	]
	};

	//Only add tokens to the request if they're wanted (vars not passed as true)
	if (param1.token != true) {
		message.parameters.push(["oauth_token",param1.token]);
	}
	if (param1.tokenSecret != true) {
		accessor.tokenSecret = param1.tokenSecret;
	}
	
	// If given, append request-specific parameters to the OAuth request
	for (i in param2)
	{
		message.parameters.push(param2[i]);
	}
	
	//Timestamp and sign the OAuth request
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	var req = new XMLHttpRequest();
	var url_for_dropbox = OAuth.addToURL(param1.url, message.parameters);
	req.open("PUT", url_for_dropbox , false);
	try
	{
		req.send(filedata);
	}
	catch (error)
	{
		console.log("Return error: " + error);
	}
	//req.send(filedata);

	console.log("Return status: " + req.status);
}