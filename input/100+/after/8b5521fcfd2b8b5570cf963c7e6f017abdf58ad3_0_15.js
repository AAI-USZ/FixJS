function(from_path, to_path, options, cb) {

			// ensure we have the tokens
			options = extend(options, {
				oauth_token : this.accessToken,
				oauth_token_secret : this.accessTokenSecret
			});

			var params = sign(options);

			params["root"] = params.root || root;
			params["from_path"] = from_path;
			params["to_path"] = to_path;

			var body = JSON.stringify(params);
			var args = {
				"method" : "POST",
				"headers" : {
					"content-type" : "application/x-www-form-urlencoded",
					"content-length" : body.length
				},
				"url" : "https://api.dropbox.com/1/fileops/copy",
				"body" : body
			};
			request(args, function(e, r, b) {
				cb( e ? null : r.statusCode, JSON.parse(b));
			});
		}