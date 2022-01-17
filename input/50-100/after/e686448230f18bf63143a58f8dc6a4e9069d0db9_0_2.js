function(p){

  				var user = {
  					_id : map[p.user]._id,
  					email: map[p.user].email
  				  				
  				};
  				
  				joinedpost = {
  					_id  : p._id,
  					text : p.text,
  					user : user,
  					comments : p.comments
  				};
  				
  				joinedposts.push(joinedpost);
  						
  			}