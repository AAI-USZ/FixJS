function(e) {

					if(e.url.indexOf('&oauth_token') != -1) {
						var tokens = e.url.split("&");
						ACCESS_TOKEN_SECRET = tokens[1].split("=")[1];

						destroyAuthorizeUI();
						var options = {
							oauth_token : reply.oauth_token, // required
							oauth_token_secret : reply.oauth_token_secret  // required
						};

						// get access
						that.access_token(options, function(status, reply) {
							Ti.API.info(status);
							Ti.API.info(reply);

							that.accessToken = reply.oauth_token;
							that.accessTokenSecret = reply.oauth_token_secret;

							// save so we don't login everytime
							saveAccessToken.call(that);

							// callback on success
							callback(reply);
						});
						return;

					} else if('https://www.dropbox.com/' === e.url) {
						destroyAuthorizeUI();
						return;
					} else if(e.url.indexOf('#error=access_denied') != -1) {
						destroyAuthorizeUI();
						return;
					}
				}