function(sCloudPath) {
	var aPieces = sCloudPath.split('/');
	var sContainer = aPieces[0];
	var localPath = aPieces[1];

	var CDNContainer = this.hCDNContainers[sContainer];
	if (!CDNContainer) {
		return null;
	}

	var uri = CDNContainer[o1.options.useSSL ? 'cdn_ssl_uri' : 'cdn_uri'] + '/' + localPath;
	return uri;
}