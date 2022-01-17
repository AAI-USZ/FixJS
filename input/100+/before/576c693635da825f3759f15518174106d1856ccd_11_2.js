function(err, status, username) {
			console.log(status + " " + username);
			if (err) {
				// Handle the error
	        	response.send({error: err});
	    	}
	    	
	    	//Todo: proper redirection to page after login
	    	else {
	        	// Log the user in and store user in the session
	        	User.selectUser({"userID":username}, function(error, user){
	        		if(!error){
	        			request.session.user = user;
						response.send(request.session);
	        		}
	        		else{
	        			response.send(error);
	        		}
	        	});
	      	}
	    }