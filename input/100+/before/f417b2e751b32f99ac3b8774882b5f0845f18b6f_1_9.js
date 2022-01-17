function (method, url, data, onSuccess, onFailure, headers, username, password) {
		method = method.toUpperCase();
		try {
			var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Msxml2.XMLHTTP.3.0"), 
				callbackCalled = 0, 
				s = [],
				body = data,
				ContentType = 'Content-Type',
				dataIsString = typeof data == 'string';
			
			if (data != null) {
				headers = headers || {};
				if (!dataIsString && !data.nodeType) { // if data is parameter map...
					function processParam(paramName, paramValue) {
						if (isList(paramValue))
							each(paramValue, function(v) {processParam(paramName, v);});
						else
							s.push(encodeURIComponent(paramName) + ((paramValue != null) ?  '=' + encodeURIComponent(paramValue) : ''));
					}
					each(data, processParam);
					body = s.join('&');
				}
				if (method != 'POST') {
					url += '?' + body;
					body = null;
				}
				else if (!data.nodeType && !headers[ContentType])
					headers[ContentType] = dataIsString ?  'text/plain; charset="UTF-8"' : 'application/x-www-form-urlencoded';
			}
			
			xhr.open(method, url, true, username, password);
			each(headers, function(hdrName, hdrValue) {
				xhr.setRequestHeader(hdrName, hdrValue);
			});
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && !callbackCalled++) {
					if (xhr.status == 200) {
						if (onSuccess)
							onSuccess(xhr.responseText, xhr.responseXML);
					}
					else if (onFailure)
						onFailure(xhr.status, xhr.statusText, xhr.responseText);
				}
			};
			
			xhr.send(body);
			return xhr;
		}
		catch (e) {
			if (onFailure && !callbackCalled) 
				onFailure(0, 'Err', toString(e));
		}
	}