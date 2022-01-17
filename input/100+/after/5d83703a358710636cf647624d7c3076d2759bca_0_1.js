function(request) {
						
				if (typeof $ !== 'undefined') {
					return $.ajax(request).responseText;
				} 
				else {
					var req = createXMLHttpObject();
					if (!req) return;
									
					var success, error, data, done = false;
					
					if (typeof request.success === 'function') success = request.success;
					if (typeof request.error === 'function') error = request.error;
					if (request.hasOwnProperty('data')) data = encodeURIComponent(request.data);
					var method = request.hasOwnProperty('type') ? request.type : 'GET';
					var url = request.hasOwnProperty('type') ? request.url : null;

					req.open(method, url, true);
					req.setRequestHeader('Cache-Control', 'no-cache');
					req.timeout = 3000;
					req.ontimeout = function () { error(req); }
					
					req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					if (data) req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					req.onreadystatechange = function () {
						if (req.readyState != 4) return;
						if (req.status != 200 && req.status != 304) {
							error(req);
						}
						else success(req.responseText);
					}
					
					if (req.readyState == 4) {
						success(req); return;
					}
					
					req.send(data);
				}
				
			}