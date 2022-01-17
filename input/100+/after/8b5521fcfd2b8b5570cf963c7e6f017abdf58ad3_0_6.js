function(options, cb) {
			var params = sign(options);
			var args = {
				"method" : "POST",
				"headers" : {
					"content-type" : "application/x-www-form-urlencoded"
				},
				"url" : "https://api.dropbox.com/1/oauth/access_token",
				"body" : JSON.stringify(params)
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