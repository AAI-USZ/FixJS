function initialize_enter_organization_email_form(default_text,email_in_use_message, invalid_email_ending_message, valid_email_ending_required, community_category) {
  $('input.organization_email').watermark(default_text, {className: 'default_text'});
  var form_id = "#org_email_form";
	$(form_id).validate({
	  errorPlacement: function(error, element) {
			error.appendTo(element.parent());
		},
		rules: {
      "email": {required: true, email: true, valid_email_ending_required: valid_email_ending_required, remote: ("/" + locale + "/people/check_email_availability_for_new_tribe?community_category=" + community_category)}
		},
		messages: {
			"email": { valid_email_ending_required: invalid_email_ending_message, remote: jQuery.format("{0}") }
		},
		onkeyup: false, //Only do validations when form focus changes to avoid exessive ASI calls
		submitHandler: function(form) {
      disable_and_submit(form_id, form, "false", locale);  
		}
	});
}