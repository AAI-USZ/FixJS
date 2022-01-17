function(err, user){
 		
    		var joinedpost = {
    			name : post.name,
    			text : post.text,
    			user : user
    		};
	      return res.send(joinedpost);    	
    	}