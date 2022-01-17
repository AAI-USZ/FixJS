function(request, response, host, port, path) {
	var parsedUrl = null;
	if (host == null || port == null) {
		parsedUrl = url.parse(request.url);
	}
	if (path != null) {
		request.url = path;
	}
	if (request.session && request.session.username) {
		request.headers['Authorization'] = utils.encodeAuthorization(request.session.username, request.session.password);
	}
	try {
	  proxy.proxyRequest(request, response, {
	      'host': host || parsedUrl.hostname,
	      'port': port || parsedUrl.port || 80 // default http url port
	  });
	} catch (error) {
	  response.writeHead(500);
	  response.end('Failed to proxy request: ' + e);
	  console.log(error);
	}
}