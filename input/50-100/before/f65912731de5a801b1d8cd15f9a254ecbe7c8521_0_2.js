function() {

		// set all input fields as editable

		$('input[type=text]').each(function() {

			$(this).attr('readonly', false);

		});

		

		// hide link

		$(this).hide();

		// show save link

		$('a[id=save_customizing]').show();

	}