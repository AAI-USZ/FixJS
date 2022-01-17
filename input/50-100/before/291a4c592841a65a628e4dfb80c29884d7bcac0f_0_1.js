function ok(res){

			var loc = window.location;
			
			console.log('got res: ' + JSON.stringify(res))
			res = JSON.parse(res)

			u.makeCookie(res.token, res.userId);
			
			jQuery("#result").append("Login Successful");
			
			window.location = 'http://' + window.location.host + after;
		}