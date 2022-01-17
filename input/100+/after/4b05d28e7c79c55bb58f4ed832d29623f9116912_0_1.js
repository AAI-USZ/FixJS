function (req, res, next) {
	if (! req.loggedIn) {
	    return res.redirect(everyauth.password.getLoginPath());
	}
	res.render('schedule/add.ejs');
    }