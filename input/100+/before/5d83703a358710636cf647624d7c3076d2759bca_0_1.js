function(request) {
						
				if (typeof $ !== 'undefined') {
					return $.ajax(request).responseText;
				} 
				else {
					var r = getRequestObject();
					if (!r) return;
									
					var suc, err, data;
										
					if (typeof request.success === 'function') suc = request.success;
					if (typeof request.error === 'function') err = request.error;
					if (request.hasOwnProperty('data')) data = encodeURIComponent(request.data);
					var type = request.hasOwnProperty('type') ? request.type : 'GET';
					var url = request.hasOwnProperty('type') ? request.url : null;

					r.open(type, url, true);
					r.setRequestHeader('Cache-Control', 'no-cache');
					r.timeout = 3000;
					r.ontimeout = function () { error(r); }
					
					r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					if (data) r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					r.onreadystatechange = function () {
						if (r.readyState != 4) return;
						if (r.status != 200 && r.status != 304) {
							err(r);
						}
						else suc(r.responseText);
					}
					
					if (r.readyState == 4) suc(r); return;
					r.send(data);
				}
				
			}