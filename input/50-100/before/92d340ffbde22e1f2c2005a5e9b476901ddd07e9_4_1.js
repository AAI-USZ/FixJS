function(req, res){
	if (req.session && req.session.user) {
		res.render("engage/index", { 	title: "SFU ENGAGE",
			user :  userobject,
			courses : req.session.courses,
			status : "logged in" })
	}
	else {
		//to avoid login to testing, this is comment out, using fake user instead
//		res.redirect("/login");
		res.redirect("/demo");

		//login with demo user, remove when everything is set.
	}

}