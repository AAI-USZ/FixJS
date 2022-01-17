function(user){
				if(user){
					req.session.user = user;			
					res.redirect('/admin/main');
				}
				else{ // Guest or login fail.
					console.log('not find');
					res.redirect('/admin');	
				}
			}