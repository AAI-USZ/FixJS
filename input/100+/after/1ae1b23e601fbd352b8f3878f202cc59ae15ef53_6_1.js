function() {
	app.use(express.bodyParser());
	app.use(express.errorHandler());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'wonderla cookie'}));
	app.use(connect.compress());
	
	/*
	 * The workflow implemented is as follows:
	 * 1. If user session is new i.e. either user is coming for first time or session timed out
	 * 		a. Present the user with login page
	 * 		b. In session set authentication = inprogress
	 * 
	 * 2. Whenever the request is coming as XMLHttp and user isn't authenticated status code 401 will be sent
	 */
	app.use(function(req, res, next){
		// if authenticated then call next
		if (req.session.authentication === 'done'){
			next();
		} 
		// if authentication in progress
		else if (req.session.authentication === 'inprogress'){
			// Server static file without requiring authentication
			if (req.url.indexOf('/customjs') === 0 || req.url.indexOf('/images') === 0){
				next();
			// Allow 'login' url 
			} else if (req.url.indexOf('/login') === 0){
				next();
			} else {
				if (req.isXMLHttpRequest) {
					connectUtils.unauthorized(res);
				} else {
					res.redirect('/login');
				}
			}
		}
		// if no authentication then make it in progress 
		else {
			req.session.authentication = 'inprogress';
			req.session.save();
			
			if (req.isXMLHttpRequest){
				if (req.url.indexOf('/login') === 0){
					if (req.method === 'POST') {
						next();
					} else {
						connectUtils.unauthorized(res);
					};
				} else {
					connectUtils.unauthorized(res);
				}
			} else {
				res.redirect('/login');				
			}
		}
	});
}