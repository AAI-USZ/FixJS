function() {

		

		var product_id = $('input[type=hidden][id=product_id]').val();

		var language_id = $('select[name=language_selection] option:selected').attr('id');

		var title = $('input[type=text][id=title]').val();

		var contract_periode = $('input[type=text][id=contract_periode]').val();

		var description = $('textarea[id=description]').val();

		var quantity = $('input[type=text][id=quantity]').val();

		var price = $('input[type=text][id=price]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "edit_product", product_id: product_id, language_id: language_id, title: title, contract_periode: contract_periode, description: description, quantity: quantity, price: price }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	}