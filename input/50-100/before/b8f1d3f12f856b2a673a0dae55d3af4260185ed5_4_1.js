function (req, res) {
	if (req.session && req.session.user) {

		res.render("engage/starred", { 	title: "SFU ENGAGE",
			user :  userobject,
			status : "logged in" })
	}


	else {
		//to avoid login to testing, this is comment out, using fake user instead


//		res.redirect("/login");

		//login with demo user, remove when everything is set.

		req.session.user = fake_user_2;
		res.render("engage/starred", { 	title: "SFU ENGAGE",
			user :  userobject,
			status : "logged in" })

	}

}