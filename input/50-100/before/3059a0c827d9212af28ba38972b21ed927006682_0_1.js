function() {
		var value = $(this).val();
		if (value.length > 0 && !value.match(new RegExp(AddContact.selectedContactType.validationPattern))) {
			$('#contact-error-status').text($labelValidationUsercontactNotMatch);
			ErrorUtils.addErrorStyles('#contact');
			AddContact.isValueValid = false;
		} else {
			$('#contact-error-status').text('');
			ErrorUtils.removeErrorStyles('#contact');
			AddContact.isValueValid = true;
		}
	}