function(error, user){
	        		if(!error){
	        			request.session.user = user;
						response.send(request.session);
	        		}
	        		else{
	        			response.send(error);
	        		}
	        	}