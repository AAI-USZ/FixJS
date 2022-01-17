function(err, docs){
			
			console.log(docs);
			if(0 === docs) {
				useridentity.Id = user.idForm;
				useridentity.password = user.pwForm;
				useridentity.name = user.nameForm;
				useridentity.email = user.emailForm;
				useridentity.role = 'Guest';
				
				useridentity.save(function(err){
					if(!err)
						console.log('User_inser_success');
					else
						res.redirect('/');
						
					usersModel.authenticate(user.idForm, user.pwForm, function(user){			
						if(user){
							req.session.user = user;
							res.redirect('/board');
						}
						else{
							res.render('sessions/new', {title: 'login', locals : 
								{redir: '/board'}	
							});
						}
					});//end of authenticate		
				});//end of save
			}//end of if
			else{
				console.log('existed ID');
				res.redirect('/');
			}
		}