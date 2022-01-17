function() {  					// When edit button is clicked. 	
		$("#userList").fadeOut();
		$("#addUserForm").delay(200).fadeIn();
		$('#userButtonDiv').html('<button class="btn btn-primary" id="updateUser">Update User Information</button>');
		var courseID = $(this).attr("id");						// Get the id for this course. 
		editUser(courseID);										// Edit the course with the specific id. 	
		$('html, body').animate({scrollTop:0});					// The page scrolls to the top to see the notification
	}