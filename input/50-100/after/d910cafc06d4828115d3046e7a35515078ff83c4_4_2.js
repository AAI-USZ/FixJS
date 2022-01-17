function(e, users){
				res.render('home/our-team', { title : 'Our Team',
					team:users, 
					oName:req.session.org.name, uName:req.session.user.name
				});
			}