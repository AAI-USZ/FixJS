function(sCloudPath) {
	var o1 = this;
	var aPieces = sCloudPath.split('/');
	var sContainer = aPieces[0];
	var localPath = aPieces[1];

	var CDNContainer = o1.hCDNContainers[sContainer];
	if (!CDNContainer) {
		o1._log('The container ' + sContainer  + ' is not CDN enabled. Unable to get CDN URI');
		return null;
	}

	var uri = CDNContainer[o1.options.useSSL ? 'cdn_ssl_uri' : 'cdn_uri'] + '/' + localPath;
	return uri;
}