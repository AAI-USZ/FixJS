function(sCloudPath, ttl) {
	var o1 = this;
	var uri = ttl ? o1._getTempURI(sCloudPath, ttl) : o1._getCDNURI(sCloudPath);
	return uri;
}