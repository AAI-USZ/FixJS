function(response) {
					if (response.authResponse) { // user is logged in
						FB.api({ method: 'fql.query', query: fql_confirm_perms }, _check_perms);
					} else { // User not logged in.
						_to_login();		
					}
				}, {scope: 'friends_likes,user_likes,publish_actions'}