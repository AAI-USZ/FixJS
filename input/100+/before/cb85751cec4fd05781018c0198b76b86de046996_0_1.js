function() {
			FB.init({
					appId      : '<?php echo $YOUR_APP_ID ?>', // App ID
					channelURL : '/likeometer/channel.php', // Channel File
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					oauth      : true, // enable OAuth 2.0
					xfbml      : false // parse XFBML
				});

			// Additional initialization code here

			LOM = new Likeometer();

			var oauth_url = "https://www.facebook.com/dialog/oauth?scope=" + 
				perms_needed + "&perms=" + perms_needed + "&client_id=" + 
				client_id + "&redirect_uri=https://apps.facebook.com/"+client_name +"/";

			var fql_confirm_perms = 'SELECT friends_likes,user_likes,publish_actions FROM permissions WHERE uid=me()';

			var _to_login = function() {
				top.location.href=oauth_url;
			};

			var _check_perms = function(resp) {
				// for perm in perms_needed ??
				if (resp[0]['friends_likes'] != 1){_to_login();}
				if (resp[0]['user_likes'] != 1){_to_login();}
				// if (resp[0]['publish_actions'] != 1){_to_login();}
				// if (resp[0]['publish_stream'] != 1){_to_login();}

				LOM.init(response.authResponse.accessToken, 
					response.authResponse.userID);
			};

			// Check if we have enough permission to do this
			FB.getLoginStatus(function(response) {
					if (response.authResponse) { // user is logged in
						FB.api({ method: 'fql.query', query: fql_confirm_perms }, _check_perms);
					} else { // User not logged in.
						_to_login();		
					}
				}, {scope: 'friends_likes,user_likes,publish_actions'});
		}