function() {

		

		var product_id = $('input[type=hidden][id=product_id]').val();

		var language_id = $('input[type=hidden][id=language_id]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_create_new_attribute_for_product", product_id: product_id, language_id: language_id}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	}