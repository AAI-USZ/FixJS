function (req, res) {

	if (req.session && req.session.user) {
		var myarticles = [];
		for (i in articles) {
			if (articles[i].user === userobject){
				myarticles.push(articles[i])
			}
		}
		//console.log(myarticles);
		res.render("engage/contributions", { title:"SFU ENGAGE",
			user:userobject,
			contributions : myarticles,
			courses : req.session.courses,
			status:"logged in"     })
	}
	else {
		//to avoid login to testing, this is comment out, using fake user instead
//		res.redirect("/login");
		res.redirect("/demo");

		//login with demo user, remove when everything is set.
	}

}