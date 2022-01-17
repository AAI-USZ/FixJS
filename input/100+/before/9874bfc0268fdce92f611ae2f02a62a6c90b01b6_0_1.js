function() {
	  var user_id = parseInt($("#user_id").val());
	  usr.results = {};
	  $("input").each(usr.process_input);  
	  $("select").each(usr.process_input);
	  var errors = false;
	  var em = usr.results["email"];
	  if (em == null || em.trim() == "") {
		  errors = true;
		  $("#email_errors").text("You must enter an email address");
	  } else {
		  $("#email_errors").text("");
	  }
	  
	  var pw1 = usr.results["password"];
	  var pw2 = usr.results["password_repeat"];
	  /* Only check passwords for new users */
	  if (user_id < 0) {
		  if (pw1 == null || pw1.trim() == "") {
			errors = true;
			$("#password_errors").text("You must set a password for a new user");
		  } else {
		    $("#password_errors").text("");
		  }
	  }
	  if (pw1 != pw2) {
		errors = true;
		$("#password_errors").text("The passwords given must match");
	  } else {
		$("#password_errors").text("");
	  }
	  if (errors)
		  return;
	  else {
		var u = new usr.User();
		if (user_id > -1) {
			u.set("user-id", user_id);
		}
		u.save(usr.results, { success: function(model, response) {
					usr.nav_to_user_list();	
				 },
				 error: function() {	
					alert("error while saving user data");
				 }
		});
	  }  
  }