function(error, response, body){
		console.log("Response received: " + body);
		callback(error, response, body);
	}