function(error, user){
	        		if(!error){
	        			//If no user was found in the database, create a new one
	        			if(!user){
	        				var newUser = {
								firstName: ""
								, lastName: ""
								, userID: username
								, email: username + "@sfu.ca"
							}
	        				User.createUser(newUser, function(error, user){
	        					if(error){
		        					response.send(error);
	        					}
	        					else{
	        						request.session.user = user;
									response.send(request.session);
	        					}
	        				})

	        			}
	        		}
	        		else{
	        			response.send(error);
	        		}
	        	}