function(path, options, cb) {
			// ensure we have the tokens
			options = extend(options, {
				oauth_token : this.accessToken,
				oauth_token_secret : this.accessTokenSecret
			});

			var params = sign(options);
			var urlX = "";
			for(var a in params) {
				if(a){
					urlX += Titanium.Network.encodeURIComponent(a) + '=' + Titanium.Network.encodeURIComponent(params[a]) + '&';
				}
			}
			var args = {
				"method" : "GET",
				"url" : "https://api.dropbox.com/1/metadata/" + (params.root || root) + "/" + escape(path) + "?" + urlX,
				"encoding" : null
			};
			return request(args, function(e, r, b) {
				cb( e ? null : r.statusCode, r.statusCode == 304 ? {} : JSON.parse(b));
			});
		}