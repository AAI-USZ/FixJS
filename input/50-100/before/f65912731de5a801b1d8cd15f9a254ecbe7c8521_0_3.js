function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_create_attribute_form"}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	}