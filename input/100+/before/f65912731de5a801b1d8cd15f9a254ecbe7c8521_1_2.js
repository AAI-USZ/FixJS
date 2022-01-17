function() {



		// clear message area

		// $('#error_msg_area').html('');

		// $('.messagearea').html('');



		var customer_id = $(this).attr('rel');



		$.ajax({

			type : "POST",

			url : "logic/process_customer_action.php",

			data : {

				action : "get_edit_customer_data",

				customer_id : customer_id

			}

		}).done(function(msg) {

			$('.customer_content_container').html(msg);

		});



		return false;

	}