function(msg) {

					if (msg == 'true') {

						$.colorbox.close();

						$('a[id=customercenter]').addClass('nav');



						if (position != '') {

							$.ajax({

								type : "POST",

								url : "logic/process_content_handling.php",

								data : {

									action : "show_specific_page",

									destination : position

								}

							}).done(function(msg) {

								

							});

						} else {

							$.ajax({

								type : "POST",

								url : "logic/process_content_handling.php",

								data : {

									action : "show_customercenter"

								}

							}).done(function(msg) {

								$('.content_container').html(msg);

							});

						}



						$.ajax({

							type : "POST",

							url : "logic/process_customer_action.php",

							data : {

								action : "show_customer_header"

							}

						}).done(function(msg) {

							$('#customer_header_ajax').html(msg);

						});



					} else {

						$('#messagearea').html(msg);

					}

				}