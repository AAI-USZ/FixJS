function(path, query, options, cb) {

			// ensure we have the tokens
			options = extend(options, {
				oauth_token : this.accessToken,
				oauth_token_secret : this.accessTokenSecret
			});

			var params = sign(options);
			params["query"] = query;

			var body = JSON.stringify(params);
			var args = {
				"method" : "POST",
				"headers" : {
					"content-type" : "application/x-www-form-urlencoded",
					"content-length" : body.length
				},
				"url" : "https://api.dropbox.com/1/search/" + (params.root || root) + "/" + escape(path),
				"body" : body
			};
			request(args, function(e, r, b) {
				cb(r.status, JSON.parse(b));
			});
		}