function() { 													// Auto runs everything inside when this script is loaded
		
		viewUsers ();											// Render the table of users from function declared below	
		
		$('#addUserButton').live('click', function() {  		// Add user when Form is submitted
			
			var firstName = $('#firstName').val();				// Populates the fields needed for the database. Validation is done through Crystal's code. 
			var lastName  = $('#lastName').val();
			var username  = $('#email').val();
			var sysRole   = $('#sysRole option:selected').val();
			var password  = $('#password').val();
			var facebook  = $('#facebook').val();
			var userPicture  = $('#userPicture').val();
			var userAbout  = $('#userAbout').val();
			var twitter   = $('#twitter').val();
			var phone 	  = $('#phone').val();
			var website   = $('#website').val();	
			var status   = $('#userStatus').val();
				
			addUser(firstName, lastName, username, password, sysRole, facebook, twitter, phone, website, status, userPicture, userAbout); // Call the function
			viewUsers ();										// Refresh the list of users
		});
		
				
}