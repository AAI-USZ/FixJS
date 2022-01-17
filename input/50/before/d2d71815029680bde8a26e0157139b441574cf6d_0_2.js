function initForm() {
				selectedForm.find('.required').each(function() {
					$(this).parent().find('label').append('<span style="color: red;">*</span>');
				});
			}