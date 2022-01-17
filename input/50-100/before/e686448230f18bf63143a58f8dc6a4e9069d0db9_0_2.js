function(p){

  				var user = {
  					_id : map[p.user]._id,
  					email: map[p.user].email
  				  				
  				};
  				
  				joinedpost = {
  					text : p.text,
  					user : user,
  					comments : p.comments
  				};
  				
  				joinedposts.push(joinedpost);
  						
  			}