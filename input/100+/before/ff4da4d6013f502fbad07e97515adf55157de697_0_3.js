function(sCloudPath, ttl) {
	var o1 = this;

	// If ttl is given, generate at emp URI
	var method = 'GET';
	var expires = Math.floor(Date.now() / 1000) + ttl;
	var path = o1.config.storage + sCloudPath;
	var body = 'GET\n' + expires + '\n' + path;

	var hash = crypto.createHmac('sha1', o1.options.tempURLKey).update(body).digest('hex');
	var uri = o1.config.storage + sCloudPath + '?temp_url_sig=' + hash + '&temp_url_expires= + expires';
	return uri;
}