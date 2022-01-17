function() {



				var mandatory_filled = true;

				var customerData = {};

				var shippingAddress = {};

				var billingAddress = {};



				$("input[rel=mandatory]").each(function() {

					if (!$(this).val() && mandatory_filled == true) {

						mandatory_filled = false;

						return false;

					}

				});

				if (mandatory_filled == false) {

					$.ajax({

						type : "POST",

						url : "logic/process_inputcheck.php",

						data : {

							action : "get_message_mandatory_not_filled"

						}

					}).done(function(msg) {

						$('#error_msg_area').html(msg);

						$('html, body').animate({

							scrollTop : $('.messagearea').offset().top

						}, 1000);



					});

				} else {

					// get all input fields for customer data

					$('input[id^=general]').each(function() {

						var key = $(this).attr('id');

						key = key.substr(7,key.strlen);

						

						customerData[key] = $(this).val();

					});

					

					// read shipping information

					var shipping_address_id = $('input[id=address_id_shipping]').val();

					

					$('input[id^=shipping]').each(function() {

						var key = $(this).attr('id');

						key = key.substr(8,key.strlen);

						

						shippingAddress[key] = $(this).val();

					});

					

					// read billing information

					var billing_address_id = $('input[id=address_id_billing]').val();

					

					$('input[id^=billing]').each(function() {

						var key = $(this).attr('id');

						key = key.substr(7,key.strlen);

						

						billingAddress[key] = $(this).val();

					});

					

					// get select fields

					$('select[id^=general] option:selected').each(function() {

						var key = $(this).attr('name');

						key = key.substr(7,key.strlen);

						

						customerData[key] = $(this).attr('id');

					});

					

					// get select fields

					$('select[id^=shipping] option:selected').each(function() {

						var key = $(this).attr('name');

						key = key.substr(8,key.strlen);

						

						shippingAddress[key] = $(this).attr('id');

					});

					

					// get select fields

					$('select[id^=billing] option:selected').each(function() {

						var key = $(this).attr('name');

						key = key.substr(7,key.strlen);

						

						billingAddress[key] = $(this).attr('id');

					});

					

					var customer_id = $(this).attr('rel');

					// update DB with changed customer data

					$.ajax({

						type : "POST",

						url : "logic/process_db.php",

						data : {

							action : "update_customer",

							customerData : customerData,

							customer_id : customer_id,

							shippingAddress : shippingAddress,

							shipping_address_id : shipping_address_id,

							billingAddress : billingAddress,

							billing_address_id : billing_address_id

						}

					}).done(function(msg) {

						$('.customer_content_container').html(msg);

					});



					// get overview page with all customizing entries

					// $.ajax({

					// type : "POST",

					// url : "logic/process_customer_action.php",

					// data : {

					// action : "get_customer_data",

					// customer_id : customer_id

					// }

					// }).done(function(msg) {

					// $('.customer_content_container').html(msg);

					// // $('a[id=save_customizing]').hide();

					// });

				}



				return false;

			}