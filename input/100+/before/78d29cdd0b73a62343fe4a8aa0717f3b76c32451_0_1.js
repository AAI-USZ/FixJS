function() {
	$("#mobile").trigger('change');
	var validator = $(".contact_form").validate({
		rules: {
			mobile: {
				remote: {
					url: url_root + 'contact/checkForDuplicates',
					type: "GET",
					data: {
						contactId: $("input[name=contactId]").val()
					}
				}
			}
		},
		messages: {
			mobile: {
				remote: i18n("contact.exists.warn")
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent());
		}
	});
	jQuery.validator.addMethod("phoneNumber", function(value, element) {
		var valid = true;
		var hasChar = $(element).val().match(/[^\+?\d+]/);
		if(hasChar != null) {
			valid = false;
		}
		return valid;
	}, i18n("fmessage.number.error"));
}