function(url, onLoad, scope, isSynchronous) {
			var fileName  = url.split('/').pop(),
					isLoaded  = false,
					noCache   = '?nocache=' + Number(new Date());
					onLoadFn = function() {
						if (!isLoaded) {
							isLoaded = true;
							onLoad.call(scope);
						}
					};
			
			if (!isSynchronous) { //asynchronous
				var script = document.createElement('script'),
						head = document.head || document.getElementsByTagName('head')[0];

				script.type = 'text/javascript';
				script.src = url + noCache;
				script.onload = onLoadFn;
				script.onreadystatechange = function() {
						if (this.readyState == 'loaded' || this.readyState == 'complete') {
								onLoadFn();
						}
				};

				head.appendChild(script);
			}
			else { //synchronous
				var xhr, status;

				if (window.XMLHttpRequest) {
						xhr = new XMLHttpRequest();
				} else {
						xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}

				if (xhr) {
					xhr.open('GET', url + noCache, false);
					xhr.send(null);

					status = (xhr.status == 1223) ? 204 : xhr.status;

					if (status >= 200 && status < 300) {
						new Function(xhr.responseText + "\n//@ sourceURL="+fileName)();
						onLoadFn();
					}
					else {
						console.log("Cannot load ", url, "error code", code);
					}
				}
			}
			
			return script
		}