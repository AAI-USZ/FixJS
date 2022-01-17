function(err, user){
 		
    		var joinedpost = {
    			_id  : post._id,
    			name : post.name,
    			text : post.text,
    			user : user
    		};
	      return res.send(joinedpost);    	
    	}