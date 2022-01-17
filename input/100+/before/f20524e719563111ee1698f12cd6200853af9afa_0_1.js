function initialize_signup_form(locale, username_in_use_message, invalid_username_message, email_in_use_message, captcha_message, invalid_invitation_code_message, name_required, invitation_required) {
  console.log("Here we are");
	$('#help_captcha_link').click(function() { $('#help_captcha').lightbox_me({centered: true}); });
	$('#help_invitation_code_link').click(function() { $('#help_invitation_code').lightbox_me({centered: true}); });
	$('#terms_link').click(function() { $('#terms').lightbox_me({centered: true}); });
	$("input[type=checkbox]").uniform();
	var form_id = "#new_person"
	//name_required = (name_required == 1) ? true : false
	$(form_id).validate({
		errorPlacement: function(error, element) {
			if (element.attr("name") == "person[terms]") {
				error.appendTo(element.parent().parent().parent().parent().parent());
			} else if (element.attr("name") == "recaptcha_response_field") {
			  error.appendTo(element.parent().parent().parent().parent().parent().parent().parent().parent().parent());
			} else {
				error.insertAfter(element);
			}	
		},
		rules: {
      "person[username]": {required: true, minlength: 3, maxlength: 20, valid_username: true, remote: "/people/check_username_availability"},
      "person[given_name]": {required: name_required, maxlength: 30},
      "person[family_name]": {required: name_required, maxlength: 30},
      "person[email]": {required: true, email: true, remote: "/people/check_email_availability_and_validity"},
      "person[terms]": "required",
      "person[password]": { required: true, minlength: 4 },
      "person[password2]": { required: true, minlength: 4, equalTo: "#person_password" },
			"recaptcha_response_field": {required: true, captcha: true },
			"invitation_code": {required: invitation_required, remote: "/people/check_invitation_code"}
		},
		messages: {
		  "recaptcha_response_field": { captcha: captcha_message },
			"person[username]": { valid_username: invalid_username_message, remote: username_in_use_message },
			"person[email]": { remote: email_in_use_message },
			"invitation_code": { remote: invalid_invitation_code_message }
		},
		onkeyup: false, //Only do validations when form focus changes to avoid exessive ASI calls
		submitHandler: function(form) {
      disable_and_submit(form_id, form, "false", locale);  
		}
	});	
}