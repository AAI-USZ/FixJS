function authenticate(req, res, next){
		//console.log('authenticating: ' + JSON.stringify(req.cookies));

		if(req.cookies.SID === undefined){
			doLoginRedirect();
			return;
		}

		var pi = req.cookies.SID.indexOf('|')
		if(pi === -1){
			doLoginRedirect();
			return;
		}
		var sid = req.cookies.SID.substr(0, pi);

		function doLoginRedirect(){
			log('redirecting to ' + '/login?next='+req.url);
			res.redirect('/login?next=' + req.url);
		}


		getUser().checkSession(sid, function(ok, userId){
			if(ok){
				getUser().getEmail(userId, function(email){
					req.user = {id: userId, email: email};
					next();
				});
			}else{
				util.debug('redirecting to login');
				doLoginRedirect();
			}
		});
	}