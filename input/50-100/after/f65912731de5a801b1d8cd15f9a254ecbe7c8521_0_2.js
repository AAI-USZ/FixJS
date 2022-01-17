function() {

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_customizing_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

			$('a[id=save_customizing]').hide();

			$('a[id=back_to_myshop]').hide();

		});

		

		return false;

	}