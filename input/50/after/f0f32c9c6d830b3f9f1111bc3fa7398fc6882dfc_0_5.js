function protocolAndHost(host ) {

		var port = location.port === '80' ? '' : location.port;

		return location.protocol + '//' + (host || location.hostname) + (port ? (':' + port) : '');
	}