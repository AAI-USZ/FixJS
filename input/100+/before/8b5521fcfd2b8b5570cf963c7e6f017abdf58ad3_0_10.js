function(path, body, options, cb) {

			// ensure we have the tokens
			options = extend(options, {
				oauth_token : this.accessToken,
				oauth_token_secret : this.accessTokenSecret
			});

			var params = sign(options)
			var urlX = "";
			for(var a in params) {
				urlX += Titanium.Network.encodeURIComponent(a) + '=' + Titanium.Network.encodeURIComponent(params[a]) + '&';
			}

			var args = {
				"method" : "PUT",
				"headers" : {
					"content-length" : body.length
				},
				"url" : "https://api-content.dropbox.com/1/files_put/" + (params.root || root) + "/" + escape(path) + "?" + urlX,
				"body" : body
			}
			request(args, function(e, r, b) {
				cb( e ? null : r.status, JSON.parse(b))
			})
		}