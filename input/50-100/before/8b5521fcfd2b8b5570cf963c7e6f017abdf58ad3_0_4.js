function(options, cb) {

			// ensure we have the tokens
			options = extend(options, {
				oauth_token : this.accessToken,
				oauth_token_secret : this.accessTokenSecret
			});

			var params = sign(options)
			var args = {
				"method" : "POST",
				"headers" : {
					"content-type" : "application/x-www-form-urlencoded"
				},
				"url" : "https://api.dropbox.com/1/account/info",
				"body" : JSON.stringify(params)
			}
			request(args, function(e, r, b) {
				cb(r.status, JSON.parse(b))
			})
		}