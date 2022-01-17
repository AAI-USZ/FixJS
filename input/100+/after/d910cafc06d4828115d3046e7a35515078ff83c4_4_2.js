function(req, res){
	    if (req.session.user == null || req.session.org == null){
			res.redirect('/login');
		}	else{
			res.render('home/about-us', { title : 'About Us',
				org:req.session.org,
				oName:req.session.org.name, uName:req.session.user.name
			});
		}
	}