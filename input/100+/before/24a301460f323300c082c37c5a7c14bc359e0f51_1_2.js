function(id)
{
	var main = this; 
	var i; 
	for(i = 0; i < main.data.allUsers.length; i++ )	// If view is not specified Construct the table for each element
			{  
				var o = main.data.allUsers[i];
				
				if(o.UserID === id) 
				{
					console.log(o);
					$('#profileName').html(o.firstName + " " + o.lastName + " ");
			  		$('#profileEmail').html("  " + o.username);
			  	  	$('#profileAbout1').html(o.userAbout);
			  	  	$('#profileFacebook').html(o.userFacebook);	
			  	  	$('#profileTwitter').html(o.userTwitter);
			  	  	$('#profilePhone').html(o.userPhone);	
			  	  	$('#profileWebsite').html(o.userWebsite);
			  	  	//$('#userStatus').html(singleUser.status);
			  	  	$('#profilePicture').html("<img src=\"" + o.userPictureURL + "\" width=\"120\">");		
			  	  }						
	}			
}