function (req, res) {
	if (req.session && req.session.user) {
		var selectedCourse = req.params.id;
		var courseArticles = [];
		for (i in articles) {
			if (articles[i].course === selectedCourse){
				courseArticles.push(articles[i])
			}
		}

		res.render("engage/course", { title:"SFU ENGAGE",
			course : selectedCourse,
			user:userobject,
			courseArticles : courseArticles,
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