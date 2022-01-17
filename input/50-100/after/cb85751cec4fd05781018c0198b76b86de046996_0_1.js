function(resp) {
				// for perm in perms_needed ??
				if (resp[0]['friends_likes'] != 1){_to_login();}
				if (resp[0]['user_likes'] != 1){_to_login();}
				// if (resp[0]['publish_actions'] != 1){_to_login();}
				// if (resp[0]['publish_stream'] != 1){_to_login();}

				LOM.init(auth_response.authResponse.accessToken, 
					auth_response.authResponse.userID);
			}