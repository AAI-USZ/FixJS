function() {
	console.log("Generating Auth Header...");
	// Get timestamp
	var timestamp = Math.round(new Date().getTime() / 1000);
	console.log("Timestamp: " + timestamp);
	// Set port
	var uri = url.parse(this._target);
	if (!uri.port) uri.port = (uri.protocol == 'https:') ? '443' : '80';
	console.log("Set port: " + uri.port);
	// Define a random nonce
	var nonce = randomstring.generate(12);
	console.log("Created nonce: " + nonce);
	// Create the normalized string:
	// timestamp\n
	// nonce\n
	// method\n
	// target_url\n
	// host\n
	// port\n
	// \n
	var normalized = timestamp + "\n" + nonce + "\n" + "GET" + "\n" +
		uri.path + "\n" + uri.host + "\n" + uri.port + "\n";
	console.log("Created normalized: \n" + normalized);
	console.log("Auth token: " + this._req.session.oauth_mac_key);
	// Create the request mac
	var mac_string = crypto.createHmac('SHA256', this._req.session.oauth_mac_key).update(normalized).digest('base64');
	console.log("Created mac_string: " + mac_string);

	var auth_header = "Mac id=\"" + this._req.session.oauth_access_token 
		+ "\", ts=\"" + timestamp 
		+ "\", nonce=\"" + nonce 
		+ "\", mac=\"" + mac_string + "\"";
	console.log("auth header: " + auth_header);

	return auth_header;
}