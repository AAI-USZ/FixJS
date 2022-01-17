function(cb) {
			var signature = sign({});
			var args = {
				"method" : "POST",
				"headers" : {
					"content-type" : "application/x-www-form-urlencoded"
				},
				"url" : "https://api.dropbox.com/1/oauth/request_token",
				"body" : JSON.stringify(signature)
			};
			request(args, function(e, r, b) {
				var obj = {};
				b.split("&").forEach(function(kv) {
					var kv = kv.split("=");
					obj[kv[0]] = kv[1];
				});
				cb(r.status, obj);
			});
		}