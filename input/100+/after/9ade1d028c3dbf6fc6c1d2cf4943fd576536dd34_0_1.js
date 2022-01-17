function() {



	// SEO friendly URLS begin



	// Override the default behavior of all hyperlinks that are part of the nav

	// class so that, when

	// clicked, their `id` value is pushed onto the history hash instead of

	// being navigated to directly.

	$("body").on("click", "a[class^=nav]", function() {

		var state = $(this).attr('id');

		var lang = $('input[type=hidden][id=site_language]').val();

		// $.bbq.pushState('#!page=' + state + '&lang=' + lang);

		$.bbq.pushState(state + '.html?lang=' + lang, 2);



		return false;

	});



	// Bind a callback that executes when document.location.hash changes.

	$(window).bind("hashchange", function(e) {

		// var url = $.bbq.getState("!page");

		var lang = $.bbq.getState("lang");



		var fragment = $.param.fragment();



		var newurl = fragment.substr(0, fragment.indexOf('.'));



		if (newurl == '') {

			newurl = 'home';

		}



		// dynamic content loading

		loadContent(newurl, lang);



	});



	// Since the event is only triggered when the hash changes, we need to

	// trigger the event now, to handle

	// the hash the page may have loaded with.

	$(window).trigger("hashchange");



	// SEO friendly URLS end



	$(document).ready(function() {

		// code that is executed if page was loaded



	});



	/*

	 * 

	 * check if password has minimal length from customizing

	 * 

	 */

	$("body").on("change", "form[id=registrationform] input[id=password]",

			function() {

				var password = $(this).val();



				$.ajax({

					type : "POST",

					url : "logic/process_inputcheck.php",

					data : {

						action : "check_passwordlength",

						password : password

					}

				}).done(function(msg) {

					// clear old message, if exists and append new one

					$('#short_password').remove();

					$('#messagearea').append(msg);

				});

			});



	// check valid e-mail address

	/*

	 * $("body").on("change", "form[id=registrationform] input[id=email]",

	 * function() { var email = $(this).val();

	 * 

	 * $.ajax({ type : "POST", url : "logic/process_inputcheck.php", data : {

	 * action : "check_email", email : email } }).done(function(msg) {

	 * $('#messagearea').html(msg); }); });

	 */



	// check valid phone no.

	$("body").on("change", "form[id=registrationform] input[id=telephone]",

			function() {

				var phone_no = $(this).val();



				$.ajax({

					type : "POST",

					url : "logic/process_inputcheck.php",

					data : {

						action : "check_phone_no",

						phone_no : phone_no

					}

				}).done(function(msg) {

					$('#messagearea').html(msg);

				});

			});



	/*

	 * 

	 * validate entered passwords

	 * 

	 */

	$("body").on("change", "form[id=registrationform] input[id=passwordagain]",

			function() {

				var password = $("input[id=password]").val();

				var passwordagain = $(this).val();



//				passwordsMatching(password, passwordagain);



			});



	/*

	 * 

	 * validate entered email adress

	 * 

	 */

	$("body").on("change", "input[id=email]", function() {

		validateEmail($(this).val());

	});



	/*

	 * 

	 * validate entered telephone number

	 * 

	 */

	$("body").on("change", "input[id=telephone]", function() {

		validateTelephone($(this).val());

	});



	/*

	 * 

	 * validate entered fax number

	 * 

	 */

	$("body").on("change", "input[id=fax]", function() {

		validateFax($(this).val());

	});



	/*

	 * 

	 * trigger processing for registration

	 * 

	 */

	$("body")

			.on(

					"click",

					"form[id=registrationform] input[type=submit][id=register]",

					function() {



						var customerData = {};



						if (mandatoryFilled() == true) {

							// get all input fields

							$('input[type=text]').each(function() {

								var key = $(this).attr('id');

								customerData[key] = $(this).val();

							});



							// get password

							customerData['email'] = $(

									'input[type=email][id=email]').val();



							// get password

							customerData['password'] = $(

									'input[type=password][id=password]').val();



							var passwordretry = $(

									'input[type=password][id=passwordagain]')

									.val();



							// check if any input is invalid

							if (passwordsMatching(customerData['password'],

									passwordretry) == false) {

								return false;

							} else {

								// get all select fields

								$('select option:selected').each(function() {

									var key = $(this).attr('name');

									customerData[key] = $(this).attr('id');

								});

								$

										.ajax({

											type : "POST",

											url : "logic/process_db.php",

											data : {

												action : "create_customer",

												customerData : customerData

											}

										})

										.done(

												function(msg) {

													// $('#messagearea').html(

													// msg

													// );

													$('a[id=customercenter]')

															.addClass('nav');

													$

															.ajax({

																type : "POST",

																url : "logic/process_usermanagement.php",

																data : {

																	action : "login_customer",

																	email : customerData['email'],

																	password : customerData['password']

																}

															});



													$

															.ajax(

																	{

																		type : "POST",

																		url : "logic/process_customer_action.php",

																		data : {

																			action : "show_customer_header"

																		}

																	})

															.done(

																	function(

																			msg) {

																		$(

																				'#customer_header_ajax')

																				.html(

																						msg);

																	});

													window.location.href = "index.php#!page=customercenter";

												});

							}

						}

						return false;

					});



	/*

	 * 

	 * check if all mandatory fields are filled in registration form

	 * 

	 */

	function mandatoryFilled() {

		var mandatory_filled = true;



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

				$('#messagearea').append(msg);

				return false;

			});



		} else {

			$('div[id=mandatory_fields]').remove();

			return true;

		}

	}



	/*

	 * 

	 * check if two passwords matching

	 * 

	 */

	function passwordsMatching(password_one, password_two) {

		if (password_one != password_two) {



			$.ajax({

				type : "POST",

				url : "logic/process_inputcheck.php",

				data : {

					action : "get_message_passwords_not_matching"

				}

			}).done(function(msg) {

				$('#messagearea').html(msg);

				return false;

			});

		} else {

			$('div[id=passwords_not_matching]').remove();

			return true;

		}

	}



	/*

	 * 

	 * check if email is in valid format

	 * 

	 */

	function validateEmail(input) {

		$('div[id=invalid_email_message]').remove();

		if (!input

				.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z][a-z]+)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {



			$.ajax({

				type : "POST",

				url : "logic/process_inputcheck.php",

				data : {

					action : "get_message_invalid_email"

				}

			}).done(function(msg) {

				$('#messagearea').append(msg);

			});



			return true;

		} else {

			$('div[id=invalid_email_message]').remove();

			return false;

		}

	}



	/*

	 * check if input is valid fax number

	 * 

	 */

	function validateFax(input) {

		$('div[id=invalid_fax]').remove();

		if (!isPhoneOrFaxNo(input)) {

			$.ajax({

				type : "POST",

				url : "logic/process_inputcheck.php",

				data : {

					action : "get_message_invalid_fax"

				}

			}).done(function(msg) {

				$('#messagearea').append(msg);

				return false;

			});

		} else {

			$('div[id=invalid_fax]').remove();

		}

	}



	/*

	 * check if input is valid telephone number

	 * 

	 */

	function validateTelephone(input) {

		$('div[id=invalid_telephone]').remove();

		if (!isPhoneOrFaxNo(input)) {

			$.ajax({

				type : "POST",

				url : "logic/process_inputcheck.php",

				data : {

					action : "get_message_invalid_telephone"

				}

			}).done(function(msg) {

				$('#messagearea').append(msg);

				return false;

			});

		} else {

			$('div[id=invalid_telephone]').remove();

		}

	}



	/*

	 * 

	 * check if input matches the regular phone/fax numbers

	 * 

	 */

	function isPhoneOrFaxNo(input) {

		var reg_exp = /^(((\+|00)\d{2})|0)\d+\s?(\/|-)?\s?\d+/;

		if (input.match(reg_exp)) {

			return true;

		} else {

			return false;

		}

	}



	// ask customer if reset should be done now

	$("body").on("click", "form[id=registrationform] input[id=clear]",

			function() {



				var confirm_message = '';



				// get confirm message

				$.ajax({

					type : "POST",

					url : "logic/get_texts.php",

					data : {

						action : "get_message_reset_registration_form_confirm"

					}

				}).done(function(msg) {

					confirm_message = msg;



					var confirm_result = confirm(confirm_message);



					if (confirm_result == true) {

						// document.getElementById('registrationform').reset();

						$('#registrationform').get(0).reset();

					}



				});



				return false;



			});



	// process login procedure

	$("body")

			.on(

					"click",

					"form[id=loginform] input[type=submit][id=login]",

					function() {

						var email = $('input[type=email][id=email]').val();

						var password = $('input[type=password][id=password]')

								.val();



						// do ajax call. If login was successful redirect to

						// customer center

						$

								.ajax(

										{

											type : "POST",

											url : "../logic/process_usermanagement.php",

											data : {

												action : "login_customer",

												email : email,

												password : password

											}

										})

								.done(

										function(msg) {

											$('#messagearea').html(msg);

											window.location.href = "../customercenter/index.php?content=customercenter";

										});



						// reset input fields

						$('input[type=email][id=email]').val('');

						$('input[type=password][id=password]').val('');



						return false;

					});



	// remove product from shopping cart

	$("body").on("click", "a[id^=removeproduct_]", function() {

		var product_id = $(this).attr('rel');



		$.ajax({

			type : "POST",

			url : "logic/process_business_logic.php",

			data : {

				action : "remove_product_from_cart",

				product_id : product_id

			}

		}).done(function(msg) {

			setProductCountInCart();



			$.ajax({

				type : "POST",

				url : "logic/process_content_handling.php",

				data : {

					action : "show_shoppingcart"

				}

			}).done(function(msg) {

				$('.content_container').html(msg);

			});

		});



	});



	// decrease number of product in shopping cart

	$("body").on("click", "span[id=decrease_cart]", function() {

		var product_id = $(this).attr('rel');

		var quantity = $('input[id=quantity_'+product_id+']').val();

		

		// if quantity is greater than 1 decrease product by one

		if(parseInt(quantity) > 1) {

		

		quantity = parseInt(quantity) - parseInt(1);

		

		$.ajax({

			type : "POST",

			url : "logic/process_business_logic.php",

			data : {

				action : "decrease_product_in_cart",

				product_id : product_id, quantity : 1

			}

		}).done(function(msg) {

			setProductCountInCart();



			$.ajax({

				type : "POST",

				url : "logic/process_business_logic.php",

				data : {

					action : "get_product_amount_in_cart", product_id : product_id

				}

			}).done(function(amount) {

				$('span[id=amount_'+product_id+']').text(amount);

			});

			

			// set new quantity in product field

			$('input[id=quantity_'+product_id+']').val(quantity);

		});



		}

		// if quantity is lower than zero -> remove product from cart

		else {

			$.ajax({

				type : "POST",

				url : "logic/process_business_logic.php",

				data : {

					action : "remove_product_from_cart",

					product_id : product_id

				}

			}).done(function(msg) {

				setProductCountInCart();



				$.ajax({

					type : "POST",

					url : "logic/process_content_handling.php",

					data : {

						action : "show_shoppingcart"

					}

				}).done(function(msg) {

					$('.content_container').html(msg);

				});

			});

		}

		

	});

	

	// decrease number of product in shopping cart

	$("body").on("click", "span[id=increase_cart]", function() {

		var product_id = $(this).attr('rel');

		var quantity = $('input[id=quantity_'+product_id+']').val();

		

		quantity = parseInt(quantity) + parseInt(1);

		

		$.ajax({

			type : "POST",

			url : "logic/process_business_logic.php",

			data : {

				action : "increase_product_in_cart",

				product_id : product_id, quantity : 1

			}

		}).done(function(msg) {

			setProductCountInCart();



			$.ajax({

				type : "POST",

				url : "logic/process_business_logic.php",

				data : {

					action : "get_product_amount_in_cart", product_id : product_id

				}

			}).done(function(amount) {

				$('span[id=amount_'+product_id+']').text(amount);

			});

			

			// set new quantity in product field

			$('input[id=quantity_'+product_id+']').val(quantity);

		});



	});

	

	

	// first step in checkout process

	$("body").on("click", "a[id=start_checkout]", function() {

		$.ajax({

			type : "POST",

			url : "logic/process_usermanagement.php",

			data : {

				action : "isLoggedIn"

			}

		}).done(function(result) {

			// user is logged in as customer

			if (result == 'true') {



				$.ajax({

					type : "POST",

					url : "logic/process_content_handling.php",

					data : {

						action : "show_checkout_step2"

					}

				}).done(function(msg) {

					$('.content_container').html(msg);

				});

			}

			// user is not logged in as customer

			else {

				var current_pos = window.location.href;



				$.colorbox({

					href : "logincustomer.php?position=" + current_pos + ""

				});

			}

		});



		return false;

	});



	// third step in checkout process

	$("body").on("click", "input[id=check_terms]", function() {

		var navlink = $('a[id=checkout_step3]');

		var check_value = $(this).attr('checked');



		if (check_value == undefined) {

			navlink.removeClass('nav');

			navlink.addClass('nonav');

		} else {

			navlink.removeClass('nonav');

			navlink.addClass('nav');

		}



	});



	// catch case if terms were not accepted and customer clicks next

	$("body").on("click", "a[id=checkout_step3][class=nonav]", function() {



		$.ajax({

			type : "POST",

			url : "logic/process_content_handling.php",

			data : {

				action : "show_alert_accept_terms"

			}

		}).done(function(msg) {

			$('.message_box').html(msg);

		});



		return false;

	});



	// catch case if terms were not accepted and customer clicks next

	$("body").on("click", "a[id=checkout_step4][class=nonav]", function() {



		// read address data

		var shippingAddress = {};

		var billingAddress = {};



		/*

		 * 

		 * shipping address

		 * 

		 */

		$('input[id^=shipping]').each(function() {

			var key = $(this).attr('id');

			key = key.substr(8, key.strlen);



			shippingAddress[key] = $(this).val();

		});



		// get select fields

		$('select[id^=shipping] option:selected').each(function() {

			var key = $(this).attr('name');

			key = key.substr(8, key.strlen);



			shippingAddress[key] = $(this).attr('id');

		});



		/*

		 * 

		 * billing address

		 * 

		 */

		$('input[id^=billing]').each(function() {

			var key = $(this).attr('id');

			key = key.substr(7, key.strlen);



			billingAddress[key] = $(this).val();

		});



		// get select fields

		$('select[id^=billing] option:selected').each(function() {

			var key = $(this).attr('name');

			key = key.substr(7, key.strlen);



			billingAddress[key] = $(this).attr('id');

		});



		$.ajax({

			type : "POST",

			url : "logic/process_content_handling.php",

			data : {

				action : "show_checkout_step4",

				shippingAddress : shippingAddress,

				billingAddress : billingAddress

			}

		}).done(function(msg) {

			$('.content_container').html(msg);

		});



		return false;

	});



	// catch case if terms were not accepted and customer clicks next

	$("body").on(

			"click",

			"a[id=save_order][class=nonav]",

			function() {

				// disable link to prevent customer to click multiple times if

				// save order is in ajax call

				$(this).hide();



				// get address information

				var shipping_address_id = $(

						"input[type=hidden][id=shipping_address_id]").val();

				var billing_address_id = $(

						"input[type=hidden][id=billing_address_id]").val();



				// load received order page

				$.ajax({

					type : "POST",

					url : "logic/process_content_handling.php",

					data : {

						action : "show_order_received",

						shipping_address_id : shipping_address_id,

						billing_address_id : billing_address_id

					}

				}).done(function(msg) {

					$('.content_container').html(msg);



					showMessagePopup('success', msg, null, null);



					// clear quantity counter in header for cart

					setProductCountInCart();

				});



				return false;

			});



	// overlay for help menu

	$("body").on("click", "a[class=lightbox]", function() {

		$.colorbox({

			href : "bodys/contact_js.php"

		});



		return false;

	});



	// start customer center or open colorbox with login form

	$("body").on("click", "a[id=customercenter]", function() {

		$.ajax({

			type : "POST",

			url : "logic/process_usermanagement.php",

			data : {

				action : "isLoggedIn"

			}

		}).done(function(result) {

			if (result != 'true') {

				$.colorbox({

					href : "logincustomer.php"

				});

			}

		});



		return false;



	});



	// closes the colorbox and opens registration.php

	$("body").on("click", "a[id=registration]", function() {

		var language = $(this).attr('rel');

		$.ajax({

			type : "POST",

			url : "logic/process_content_handling.php",

			data : {

				action : 'show_registration',

				language_id : language

			}

		}).done(function(msg) {

			$('.content_container').html(msg);

		});

		$.colorbox.close();



		return false;

	});



	// colorbox for customercenter

	$("body").on("click", "a[class=customercenter]", function() {

		// $.colorbox({href:"customercenter/index.php"});



		return false;

	});



	// display details for product in product overview

	$("body").on("click", "button[class=buttonlayout_more]", function() {

		// get product id from rel tag

		var product_id = $(this).attr('rel');

		var detailboxid = '#book' + product_id;



		if ($(detailboxid).is(":hidden")) {

			$(detailboxid).slideDown("slow");

			$(this).text("Weniger");

		} else {

			$(detailboxid).slideUp();

			$(this).text("Mehr");

		}

	});



	// switches language of website

	$("body").on("click", "button[class=language_button]", function() {

		$("button").removeClass("active");

		$(this).addClass("active");



	});



	// add product from product overview to cart

	$("body").on("click", "button[class=buttonlayout_buy]", function() {

		// get product id from rel tag

		var product_id = $(this).attr('rel');



		$.ajax({

			type : "POST",

			url : "logic/process_business_logic.php",

			data : {

				action : "add_product_to_cart",

				product_id : product_id

			}

		}).done(function(msg) {

			setProductCountInCart();

			showMessagePopup("success", null, "buy_confirm", 1);

		});



		return false;



	});



	// sets current mainmenu active

	$("body").on("click", "a[class=nav]", function() {

		$("a").removeClass("mm_active");

		$(this).addClass("mm_active");

	});



	// sets current custermenu active

	$("body").on("click", "a[class=cm]", function() {

		$("a").removeClass("cm_active");

		$(this).addClass("cm_active");

	});



	// send email to admin

	$("body").on("click", "input[id=send_email]", function() {



		var first_name = $('input[type=text][id=first_name]').val();

		var last_name = $('input[type=text][id=last_name]').val();

		var email = $('input[type=email][id=email]').val();

		var message = $('textarea[id=message]').val();

		var msg_type = '';



		if ($('input[type=radio][name=message_type]')[0].checked) {

			msg_type = $('input[type=radio][id=question]').val();

		} else if ($('input[type=radio][name=message_type]')[1].checked) {

			msg_type = $('input[type=radio][id=problem]').val();

		} else if ($('input[type=radio][name=message_type]')[2].checked) {

			msg_type = $('input[type=radio][id=feedback]').val();

		}



		$.ajax({

			type : "POST",

			url : "logic/process_customer_action.php",

			data : {

				action : "send_email",

				// customer_id : customer_id,

				first_name : first_name,

				last_name : last_name,

				email : email,

				msg_type : msg_type,

				message : message

			}

		}).done(function(msg) {

			$('.contact').html(msg);

			$.fn.colorbox.close();

		});



		return false;



	});



}