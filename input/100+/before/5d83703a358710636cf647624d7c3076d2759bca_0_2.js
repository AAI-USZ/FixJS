function() {
		
		var RequestObj = [
			function() { return new XMLHttpRequest() },
			function() { return new ActiveXObject('Msxml2.XMLHTTP') },
			function() { return new ActiveXObject('Msxml3.XMLHTTP') },
			function() { return new ActiveXObject('Microsoft.XMLHTTP') }
		];
		
		var getRequestObject = function() {
			var o = false;
			for (var i = 0, l = RequestObj.length; i < l; i++) {
				try { o = RequestObj[i]();
				} catch(e) { continue; }
			}
			return o;
		};
		
		return {
		
			load: function(request) {
						
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
				
			},
			
			get: function(request) {
				request.type = 'GET';
				return Ajax.load(request);
			},
			
			post: function(request) {
				request.type = 'POST';
				return Ajax.load(request);
			},
			
			put: function(request) {
				request.type = 'PUT';
				return Ajax.load(request);
			},
			
			del: function(request) {
				request.type = 'DELETE';
				return Ajax.load(request);
			}
		
		};
	
	}