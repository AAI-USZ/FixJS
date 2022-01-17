function(sCloudPath, ttl) {
	var o1 = this;

//	o1.config.storage = 'https://storage101.dfw1.clouddrive.com/v1/MossoCloudFS_d58d266b-3601-4d95-8e96-2063c9caef48';
//	sCloudPath = 'test/test.txt';
//	o1.options.tempURLKey = '7acc0fe42358c0232053b3fc7254609c';

	// If ttl is given, generate at emp URI
	var method = 'GET';
	var expires = Math.floor(Date.now() / 1000) + ttl;
	
	var storageParts = url.parse(o1.config.storage);
	var path = storageParts.pathname + '/' + sCloudPath;
	
	var body = method + '\n' + expires + '\n' + path;

	o1._log(body);
	o1._log(o1.options.tempURLKey);
	var hash = crypto.createHmac('sha1', o1.options.tempURLKey).update(body).digest('hex');
	var uri = storageParts.protocol + '//' + storageParts.host + path + '?temp_url_sig=' + hash + '&temp_url_expires=' + expires;
	return uri;
}