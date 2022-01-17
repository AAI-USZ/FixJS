function() {					// User button and click events 
		$('#userListLink').addClass('linkGrey');
		$(this).removeClass('linkGrey');
		$("#userList").fadeOut();
		$("#addUserForm").delay(200).fadeIn();
		$('#userButtonDiv').html('<button class="btn btn-primary" id="addUserButton">Add User</button> <button class="btn btn-info" id="cancelUser">Cancel</button>');
		clearUserForm();	 // Fields are emptied to reuse
	}