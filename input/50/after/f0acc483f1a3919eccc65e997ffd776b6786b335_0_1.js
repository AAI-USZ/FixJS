function(e) {
			e.preventDefault();
			form.reset();
			$('input[type=range]', form).change();
		}