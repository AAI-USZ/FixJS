function(req, res){
	    if (req.session.user == null || req.session.org == null){
			res.redirect('/login');
		}	else{
			AM.getUsersOfOrg(req.session.org.name, function(e, users){
				res.render('home/our-team', { title : 'Our Team',
					team:users, 
					oName:req.session.org.name, uName:req.session.user.name
				});
			})
		}
	}