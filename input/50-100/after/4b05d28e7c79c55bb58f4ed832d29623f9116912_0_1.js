function (req, res, next) {
	if (! req.loggedIn) {
	    return res.redirect(everyauth.password.getLoginPath());
	}
	if (req.body.addEvent !== undefined) { 
	    addEvent(req, res, next, 'adhoc', req.user);
	} else {
	    next();
	}
    }