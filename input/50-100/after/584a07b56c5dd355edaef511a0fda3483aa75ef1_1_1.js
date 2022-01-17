function(error, user){

			if(error){throw error;}

			if(user){
				obj.user = user;
			}
			else{
				obj.user = "User not found: " + obj._source.user;
			}

			result.hits.push(obj);
			done();
		}