function(app, secureApp){
	//_.assertObject(app)
	//_.assertObject(secureApp)
	
	function authenticate(req, res, next){
		console.log('authenticating');
		var sid = req.cookies.sid;

		function doLoginRedirect(){
			sys.debug(sys.inspect(req));
			//var url = secureApp.settings.securehost + '/login?next=' + req.url;
			console.log('redirecting to ' + '/login?next='+req.url);
			//res.redirect(url);
			//res.send('need to use js redirect');
			res.app.javascriptRedirectToSecure(res, '/login?next=' + req.url);
		}

		if(sid === undefined){
			doLoginRedirect();
			return;
		}

		getUser().checkSession(sid, function(ok, userId){
			if(ok){
				getUser().getEmail(userId, function(email){
					req.user = {id: userId, email: email};
					next();
				});
			}else{
				sys.debug('redirecting to login');
				doLoginRedirect();
			}
		});
	}

	//set up services for signup, login, logout, and lost password reset.
	//all to be accessed via AJAX (these are not HTML resources.)

	function signup(req, res){

		var data = req.body;

		getUser().createUser(function(userId){
			getUser().setEmail(userId, data.email);
			getUser().setPassword(userId, data.password);

			var session = getUser().makeSession(userId);

			setSessionCookie(res, session);

			res.send(session);
		});
	}

	app.post(exports, '/ajax/signup', signup);

	function login(req, res){

		var data = req.body;

		console.log('/ajax/login request received : ' + data.email);

		getUser().findUser(data.email, function(userId){
			console.log('found user: ' + userId);
			if(userId === undefined){
				res.send({
					error: 'authentication failed'
				}, 403);
			}else{
				sys.debug('found user: ' + userId);
				getUser().authenticate(userId, data.password, function(ok){

					if(ok){
						var session = getUser().makeSession(userId);
		
						setSessionCookie(res, session);
						res.send(session);
				
					}else{
						res.send({
							error: 'authentication failed'
						}, 403);
					}
				});
			}
		});
	}

	app.post(exports, '/ajax/login', login);

	app.post(exports, '/ajax/logout', function(req, res){

		var sid = req.cookies.sid;

		if(sid !== undefined){
			getUser().clearSession(sid);
			res.clearCookie('SID');
		}

		res.send({result: 'ok'});	
	});

	//secureApp.js(exports, 'auth-utils', ['utils']);

	var loginPage = {
		url: '/login',
		css: [],
		js: 'simple_login',
		cb: function(req, res, cb){
			console.log('cbing');
			cb({after: req.query.next, port: app.port, securePort: app.securePort});
		}
	};	
	var signupPage = {
		url: '/signup',
		css: [],
		js: 'simple_signup',
		cb: function(req, res, cb){
			cb({port: res.app.getPort(), securePort: res.app.getSecurePort()})
		}
	};	

	secureApp.post(exports, '/ajax/signup', signup);
	secureApp.post(exports, '/ajax/login', login);

	secureApp.page(exports, loginPage);
	secureApp.page(exports, signupPage);
	
	return {
		authenticate: authenticate
	}
}