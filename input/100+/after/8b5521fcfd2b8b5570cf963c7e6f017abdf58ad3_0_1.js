function(options) {
		var options = JSON.parse(JSON.stringify(options));
		var secret = options["oauth_token_secret"];
		var signature = getSignature(secret);
		var timestamp = getTimestamp();
		var nonce = getNonce(timestamp);

		options["oauth_consumer_key"] = consumerKey;
		options["oauth_signature"] = signature;
		options["oauth_timestamp"] = timestamp;
		options["oauth_nonce"] = nonce;
		options["oauth_signature_method"] = "PLAINTEXT";
		options["oauth_version"] = "1.0";
		delete options["oauth_token_secret"];
		delete options["uid"];

		return options;
	}