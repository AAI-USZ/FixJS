function (params) {
		
		var x = new XMLHttpRequest();

		x.open(params.method || 'get', params.uri, true);

		x.addEventListener('load', function (e) {
			params.successCallback(x.response);
		}, false);

		x.send(params.data);
		return x;
	}