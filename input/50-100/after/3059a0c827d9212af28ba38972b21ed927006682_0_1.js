function() {
		var value = $(this).val();
		if (value.length > 0 && !value.match(new RegExp(AddContact.selectedContactType.validationPattern))) {
			if (AddContact.isValueValid) {
				ErrorUtils.addErrorMessage('#contact', $labelValidationUsercontactNotMatch);
				AddContact.isValueValid = false;
			}
		} else {
			ErrorUtils.removeErrorMessage('#contact');
			AddContact.isValueValid = true;
		}
	}