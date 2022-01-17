function authenticate(req, res, next){
		log('authenticating');

		if(req.cookies.sid === undefined){
			doLoginRedirect();
			return;
		}

		var pi = req.cookies.sid.indexOf('|')
		if(pi === -1){
			doLoginRedirect();
			return;
		}
		var sid = req.cookies.sid.substr(0, pi);

		function doLoginRedirect(){
			//sys.debug(sys.inspect(req));
			//var url = secureApp.settings.securehost + '/login?next=' + req.url;
			log('redirecting to ' + '/login?next='+req.url);
			//res.redirect(url);
			//res.send('need to use js redirect');
			//res.app.javascriptRedirectToInsecure(res, '/login?next=' + req.url);
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