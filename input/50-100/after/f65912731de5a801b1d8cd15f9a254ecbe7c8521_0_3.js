function() {



		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_product_attributes_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	}