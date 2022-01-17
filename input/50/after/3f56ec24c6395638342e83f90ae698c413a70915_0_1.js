function footer_email_form_show_details(trigger_click) {
		$('#form-details').slideDown('normal', function() {
			if (trigger_click) {
				$('#footer_email_submit').trigger('click');
			}
        });
        
        $('#footer-email-form .form-details').slideDown();
	}