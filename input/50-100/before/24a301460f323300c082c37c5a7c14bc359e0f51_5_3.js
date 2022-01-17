function() {  				// When edit button is clicked. 	
		updateUser();											// Edit the course with the specific id.
		viewUsers();
		$("#addUserForm").fadeOut();
		$("#userList").delay(200).fadeIn();
		
		$('html, body').animate({scrollTop:0});					// The page scrolls to the top to see the notification
	}