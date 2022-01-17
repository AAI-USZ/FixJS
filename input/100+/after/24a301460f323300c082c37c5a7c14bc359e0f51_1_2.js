function()
{
	var main = this;

	$('#userData').html(" ");
	var i, o; 
	for(i = 0; i < main.data.allUsers.length; i++ ){	// If view is not specified Construct the table for each element
		o =  main.data.allUsers[i] ;  			
			$('#userData').append(
			    	  		  "<tr>"
			    	  		+ "<td> <img class='userThumbS' src='" + o.userPictureURL +"' /><a class='showProfile' userid='" + o.UserID + "'>" + o.firstName + "</a></td>" 
				            + "<td> " + o.lastName	+ "</td>" 
				            + "<td> " + o.username		+ "</td>" 
				            + "<td> " + o.sysRole	+ "</td>" 
				            + "<td> " + o.userStatus		+ "</td>"
				            + "<td> <button id='" + o.UserID		+ "' class='btn btn-info editUser'>Edit</button></td>"
				            + "</tr>" 
			    );
			    	  	nameListName = { ID: o.UserID, Name : o.firstName + " " + o.lastName, Email : o.username}; 
			    	  	main.nameList.push(nameListName);
			}
}