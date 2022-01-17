f			var xhr,
				method = method.toUpperCase();
			// Provide compatibility with older IE.
			if(window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			}
			else {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhr.open(method, url, true);

			if(method === "POST") {
				xhr.setRequestHeader(
					"Content-Type", "application/x-www-form-urlencoded");
			}

			xhr.onreadystatechange = function() {
				var response;
				if(xhr.readyState === 4) {
					if(callback) {
						response = xhr.response;
						// Quick and dirty JSON detection (skipping real
						// detection).
						if(xhr.response[0] === "{" || xhr.response[0] === "[") {
							// Real JSON detection (slower).
							try {
								response = JSON.parse(xhr.response);
							}
							catch(e) {}
						}
						// Call the callback function, passing the response. If
						// response is in JSON format, the response will
						// automatically be parsed into an Object.
						callback(response, xhr);
					}
				}
			};

			xhr.send();
			return xhr;
		};
