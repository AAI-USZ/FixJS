function(tokenSecret) {
		return encode(consumerSecret) + "&" + encode(tokenSecret);
	}