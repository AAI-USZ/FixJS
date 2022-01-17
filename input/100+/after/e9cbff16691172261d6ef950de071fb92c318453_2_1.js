function (e) {
//			console.log(xhr.readyState)
			switch (xhr.readyState) {
			case xhr.UNSENT:
//				console.log('XMLHttpRequest.UNSENT');
				break;
			case xhr.OPENED:
//				console.log('XMLHttpRequest.OPENED');							
				if (method === 'POST' || method === 'PUT') {
					if (!headers || !headers['Content-Type']) {
						xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');						
					}
				}

				if (username && password) {
					xhr.setRequestHeader("Authorization", 'Basic ' + F5.Base64.encode(username + ':' + password));			
				}

				if (headers) {
					F5.forEach(headers, function (id, value) {
						xhr.setRequestHeader(id, value);
					});
				}			
				break;
			case xhr.HEADERS_RECEIVED:
//				console.log('XMLHttpRequest.HEADERS_RECEIVED');					
				break;
			case xhr.LOADING:
//				console.log('XMLHttpRequest.LOADING');					
				break;
			case xhr.DONE:	
				if (xhr.status !== 0) {
					if (success) {
						var responseHeaders = {};
						xhr.getAllResponseHeaders().split(/\r\n|\r|\n/).forEach(function (header) {
							if (header) {
								var index = header.indexOf(':');
								var key = header.substring(0, index);
								var value = header.substring(index + 1).replace(/^\s/, '');
								responseHeaders[key] = value;								
							}
						});

						success(xhr.responseText, xhr.status, responseHeaders);
					}
				} else {
					if (error) {
						error(xhr.responseText, xhr.status);
					}
				}
//				console.log('XMLHttpRequest.LOADING');
				break;				
			}								
		}