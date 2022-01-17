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
	var proxyOptions = {
	      host: host || parsedUrl.hostname,
	      port: port || parsedUrl.port
	  };
	if (proxyOptions.host && proxyOptions.port) {
	  try {
	    proxy.proxyRequest(request, response, proxyOptions);
	  }
	  catch (error) {
	    log.error('Proxy failed to forward request (' + proxyOptions + ') : ' + error);
	    response.end();
	  }
	}
	else {
	  response.end();
	}
}