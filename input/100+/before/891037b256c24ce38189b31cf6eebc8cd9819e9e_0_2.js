function(req, res){
	var useridentity = dbModel.makeUserModel();
	var user = req.body;
	
	//add at 120704. JH
	var userModel = dbModel.tossUserModel();
	//add at 120705. JH
	var regular_expression_email = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	
	if(regular_expression_email.test(user.emailForm)) {
		
		userModel.count({Id:user.idForm}, function(err, docs){
			
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
		}); //end of userModel.count
	}//end of if(regExpTest)
	else {
		console.log('not email Regular Expression');
		res.redirect('/');
	}
		
}