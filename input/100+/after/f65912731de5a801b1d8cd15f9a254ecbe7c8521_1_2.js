function() {



		var customer_id = $(this).attr('rel');



		$.ajax({

			type : "POST",

			url : "logic/process_customer_action.php",

			data : {

				action : "get_customer_data_headline",

				customer_id : customer_id

			}

		}).done(function(msg) {

			$('.headline_customercenter').html(msg);

		});

		

		$.ajax({

			type : "POST",

			url : "logic/process_customer_action.php",

			data : {

				action : "get_customer_data",

				customer_id : customer_id

			}

		}).done(function(msg) {

			$('.customer_content_container').html(msg);

		});

		

		return false;

	}