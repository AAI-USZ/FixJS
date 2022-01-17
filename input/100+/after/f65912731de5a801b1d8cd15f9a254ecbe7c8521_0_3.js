function() {



	$(document).ready(function() {

		// code that is executed if page was loaded

			

	});

	

	// process login procedure for shop backend

	$("body").on("click","form[id=loginformbackend] input[type=submit][id=login]", function() {

		var email = $('input[type=text][id=email]').val();

		var password = $('input[type=password][id=password]').val();

		

		// do ajax call. If login was successful redirect to customer center

		$.ajax({

			type: "POST",

			url: "../logic/process_usermanagement.php",

			data: { action: "login_backend", email: email, password: password }

		}).done(function( msg ) {

			$('#messagearea').html( msg );

			window.location.href = "../backend/index.php";

		});

		

		// reset input fields

		$('input[type=text][id=email]').val('');

		$('input[type=password][id=password]').val('');

		

		return false;

	});	

	

	

	// get overview page with all customizing entries

	$("body").on("click", "a[id=myshop]", function() {



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

	});	

	

	// get back from edit-customizing-view to customizing overview

	$("body").on("click", "a[id=back_to_myshop]", function() {

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

	});	



	

	// set customizing fields editable

	$('body').on("click","a[id=edit_customizing]", function() {

		// set all input fields as editable

		$('input[type=text]').each(function() {

			$(this).attr('readonly', false);

		});

		

		// hide link

		$(this).hide();

		// show save link

		$('a[id=save_customizing]').show();

		$('a[id=back_to_myshop]').show();

	});	

	

	// save customizing changes

	$('body').on("click","a[id=save_customizing]", function() {

		// set all input fields as editable

		$('input[type=text]').each(function() {

			$(this).attr('readonly', true);

			

			var key = $(this).attr('id');

			var value = $(this).val();

			var language = $('input[type=hidden][id=language]').val();

			

			$.ajax({

				type: "POST",

				url: "logic/process_db.php",

				data: { action: "save_customizing_entry", key: key, value: value, language: language }

			}).done(function( msg ) {

				//$('.content').html( msg );

				$('a[id=edit_customizing]').show();

			});

			

			$.ajax({

				type: "POST",

				url: "logic/process_action.php",

				data: { action: "msg_customizing_saved"}

			}).done(function( msg ) {

				$('.content').html( msg );

			});

			

		});

		

		// hide link

		$(this).hide();

		// show save link

		$('a[id=modify_customizing]').show();

	});	

	

	// get overview page with all products

	$("body").on("click", "a[id=myproducts]", function() {



		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_products_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// get back to product overview

	$("body").on("click", "a[id=back_to_myproducts]", function() {



		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_products_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	

	// set customizing fields editable for products

	$('body').on("click","a[id=edit_product]", function() {

		var primaryKeysFromPhp = $(this).attr('rel');

		var primaryKeys = primaryKeysFromPhp.split(",");

		

		var product_id = primaryKeys[0];

		var language_id = primaryKeys[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_product_editor", product_id: product_id , language_id: language_id}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	

	

//	$("body").on("change", "select[id=language_selection] option:selected)",(function(){

//		var language_id = $('select[id=language_selection] option:selected').attr('id');

//		alert('trigger me');

//		$.ajax({

//			type: "POST",

//			url: "logic/process_action.php",

//			data: { action: "open_product_editor", product_id: product_id , language_id: language_id}

//		}).done(function( msg ) {

//			$('.content').html( msg );

//		});

//		

//		return false;

//			

//		}));	

	

//	$(".languageSelectBox").change(function(){

//		  $(this).css("background-color","#FFFFCC");

//		  alert('guguggs');

//		}); 

//	

//	$('#language_selection').change(function(){

//		$(this).find('option:selected').each(function () {

//	    alert('triger me');

//		});

//	});

//	

//    $("#language_selection").change(function () {

//        var str = "";

//        $("select option:selected").each(function () {

//              str += $(this).text() + " ";

//              alert('BEispeil');

//            });

//        $("div").text(str);

//      })

//      .change();





	

	

	// edit product

	$("body").on("click", "input[type=submit][id=submit_edit_product]", function() {

		

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

	});

	

	

	// open create attribute for product form

	$("body").on("click", "input[type=submit][id=give_prod_new_attr]", function() {

		

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

	});

	

	

	// save attribute in product info

	$("body").on("click", "input[type=submit][id=save_new_attr_for_prod]", function() {

		

		var product_id = $('input[type=hidden][id=product_id]').val();

		//var language_id = $('input[type=hidden][id=language_id]').val();

		var attribute_id = $('select[name=attribute_selection] option:selected').attr('id');

		var value = $('input[type=text][id=value]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "create_new_product_info", product_id: product_id, attribute_id: attribute_id, value: value}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});

	

	// delete attribute in product info

	$("body").on("click", "a[id=delete_product_info]", function() {

	

		var attribute_id = $(this).attr('rel');

		var product_id = $('input[type=hidden][id=product_id]').val();

		

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "delete_product_info", product_id: product_id, attribute_id: attribute_id}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	//save changed attribute in product info  

	$("body").on("click", "input[type=submit][id=submit_edit_attributes]", function() {

		

		var product_id = $('input[type=hidden][id=product_id]').val();

		var attr_arrayFromPhp = $('input[type=hidden][id=attr_array]').val();

		

		var attr_array = attr_arrayFromPhp.split(",");



		var attr_id_array = new Array();

		var value_array = new Array();

		for(var ind = 0; ind < attr_array.length; ind ++){

			var attr_id = attr_array[ind];

			var value =  $('input[type=text][id='+attr_id+']').val();

			attr_id_array.push(attr_id);

			value_array.push(value);

		}

		

		var joined_attr_id_array = attr_id_array.join();

		var joined_value_array = value_array.join();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "update_attributes_in_prod_info", product_id: product_id, joined_attr_id_array: joined_attr_id_array, joined_value_array: joined_value_array}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

		

	// open translate Product form

	$("body").on("click","a[id=translate_product]", function() {

		var primaryKeysFromPhp = $(this).attr('rel');

		var primaryKeys = primaryKeysFromPhp.split(",");

		

		var product_id = primaryKeys[0];

		var language_id = primaryKeys[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_translate_product_form", product_id: product_id, language_id: language_id}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});

	

	// translate product

	$("body").on("click", "input[type=submit][id=submit_translate_product]", function() {

		

		var product_id = $('input[type=hidden][id=product_id]').val();

		var language_id = $('select[name=language_selection] option:selected').attr('id');

		var title = $('input[type=text][id=title]').val();

		var contract_periode = $('input[type=text][id=contract_periode]').val();

		var description = $('textarea[id=description]').val();

		var quantity = $('input[type=text][id=quantity]').val();

		var price = $('input[type=text][id=price]').val();

		var active = $('input[type=hidden][id=active]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "translate_product", product_id: product_id, language_id: language_id, title: title, contract_periode: contract_periode, description: description, quantity: quantity, price: price, active: active}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});

	

	// change product-state

	$('body').on("click","a[id=change_product_state]", function() {

		var primaryKeysFromPhp = $(this).attr('rel');

		var primaryKeys = primaryKeysFromPhp.split(",");

		

		var product_id = primaryKeys[0];

		var language_id = primaryKeys[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "change_product_state", product_id: product_id, language_id: language_id }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	// set customizing fields editable for creating a new product

	$('body').on("click","a[id=create_new_product]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_create_product_form"}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	// delete product

	$('body').on("click","a[id=delete_product]", function() {

		var primaryKeysFromPhp = $(this).attr('rel');

		var primaryKeys = primaryKeysFromPhp.split(",");

		

		var product_id = primaryKeys[0];

		var language_id = primaryKeys[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "delete_product", product_id: product_id, language_id: language_id }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	

	// save product

	$("body").on("click", "input[type=submit][id=save_product]", function() {

		

		var language_id = $('select[name=language_selection] option:selected').attr('id');

		var title = $('input[type=text][id=title]').val();

		var contract_periode = $('input[type=text][id=contract_periode]').val();

		var description = $('textarea[id=description]').val();

		var quantity = $('input[type=text][id=quantity]').val();

		var price = $('input[type=text][id=price]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "create_new_product", language_id: language_id, title: title, contract_periode: contract_periode, description: description, quantity: quantity, price: price }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});

	

	// get overview page with all product attributes.

	$("body").on("click", "a[id=myproductattributes]", function() {



		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_product_attributes_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// get back to my product attributes overview

	$("body").on("click", "a[id=back_to_myproductattribute]", function() {



		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_product_attributes_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// open form to create new attribute

	

	$("body").on("click", "a[id=create_new_product_attribute]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_create_attribute_form"}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

		

	// create new attribute

	$("body").on("click", "input[type=submit][id=create_product_attribute]", function() {

		

		var language_id = $('select[name=language_selection] option:selected').attr('id');

		var description = $('textarea[id=description]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "create_new_attribute", language_id: language_id, description: description}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

		

	// delete attribute

	$("body").on("click", "a[id=delete_product_attribute_description]", function() {

		

		var primary_keys_from_php = $(this).attr('rel');

		var primary_keys = primary_keys_from_php.split(",");

		var product_attribute_id = primary_keys[0];

		var language_id = primary_keys[1];

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "delete_product_attribute", product_attribute_id: product_attribute_id , language_id: language_id}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// set customizing fields editable for product attributes

	$("body").on("click", "a[id=edit_product_atrribute]", function() {

		

		var primaryKeysFromPhp = $(this).attr('rel');

		var primaryKeys = primaryKeysFromPhp.split(",");

		

		var product_attribute_id = primaryKeys[0];

		var language_id = primaryKeys[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_product_attribute_editor", product_attribute_id: product_attribute_id , language_id: language_id}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	

	// save changed attribute

	$("body").on("click", "input[type=submit][id=submit_edit_product_attribute]", function() {

		

		var product_attribute_id = $('input[type=hidden][id=product_attribute_id]').val();

		var language_id = $('select[name=language_selection] option:selected').attr('id');

		var description = $('textarea[id=description]').val();

	

		

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "save_changed_product_attribute", product_attribute_id: product_attribute_id, language_id: language_id, description: description,}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});		

	



	

	// get overview page with all servers

	$("body").on("click", "a[id=myservers]", function() {



		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_server_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// get form to enter new server

	$('body').on("click","a[id=create_new_server]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_create_server_form"}

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	

	// trigger creation of new server

	$("body").on("click", "input[type=submit][id=create_server]", function() {

		

		var name = $('input[type=text][id=name]').val();

		var mngmnt_ui = $('input[type=text][id=mngmnt_ui]').val();

		var ipv4 = $('input[type=text][id=ipv4]').val();

		var ipv6 = $('input[type=text][id=ipv6]').val();

		var froxlor_username = $('input[type=text][id=froxlor_username]').val();

		var froxlor_password = $('input[type=password][id=froxlor_password]').val();

		var froxlor_db = $('input[type=text][id=froxlor_db]').val();

		var froxlor_db_host = $('input[type=text][id=froxlor_db_host]').val();

		var total_space = $('input[type=text][id=total_space]').val();

		var free_space = $('input[type=text][id=free_space]').val();

		var active = $('input[type=checkbox][id=active]').val();

	

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "create_new_server", name: name, mngmnt_ui: mngmnt_ui, ipv4: ipv4, ipv6:ipv6, froxlor_username: froxlor_username, froxlor_password: froxlor_password, froxlor_db: froxlor_db, froxlor_db_host: froxlor_db_host, total_space: total_space, free_space: free_space, active: active }

		}).done(function( msg ) {

			$('.content').html( msg );

			

			if(msg == '') {

				// reload server area

				$.ajax({

					type: "POST",

					url: "logic/process_action.php",

					data: { action: "get_server_overview" }

				}).done(function( msg ) {

					$('.content').html( msg );

				});

			}	

			

		});

		

		return false;

	});

	

	// update server on DB

	$('body').on("click","a[id=edit_server]", function() {

		var server_id = $(this).attr('rel');

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_server_editor", server_id: server_id }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	// trigger server update

	$("body").on("click", "input[type=submit][id=edit_server]", function() {

		

		var server_id = $('input[type=hidden][id=server_id]').val();

		var name = $('input[type=text][id=name]').val();

		var mngmnt_ui = $('input[type=text][id=mngmnt_ui]').val();

		var ipv4 = $('input[type=text][id=ipv4]').val();

		var ipv6 = $('input[type=text][id=ipv6]').val();

		var froxlor_username = $('input[type=text][id=froxlor_username]').val();

		var froxlor_password = $('input[type=password][id=froxlor_password]').val();

		var froxlor_db = $('input[type=text][id=froxlor_db]').val();

		var froxlor_db_host = $('input[type=text][id=froxlor_db_host]').val();

		var total_space = $('input[type=text][id=total_space]').val();

		var free_space = $('input[type=text][id=free_space]').val();

		

		var active;

		if($('input[type=checkbox][id=active]').attr('checked') == 'checked') {

			active = 1;

		}

		else {

			active = 0;

		}

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "edit_server", server_id: server_id, name: name, mngmnt_ui: mngmnt_ui, ipv4: ipv4, ipv6:ipv6, froxlor_username: froxlor_username, froxlor_password: froxlor_password, froxlor_db: froxlor_db, froxlor_db_host: froxlor_db_host, total_space: total_space, free_space: free_space, active: active }

		}).done(function( msg ) {

			if(msg == '') {

				// reload server area

				$.ajax({

					type: "POST",

					url: "logic/process_action.php",

					data: { action: "get_server_overview" }

				}).done(function( msg ) {

					$('.content').html( msg );

				});

			}	

		});

		

		return false;

	});

	

	

	// delete server on DB

	$('body').on("click","a[id=delete_server]", function() {

		var server_id = $(this).attr('rel');

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "delete_server", server_id: server_id }

		}).done(function( msg ) {

			if(msg == '') {

				// reload server area

				$.ajax({

					type: "POST",

					url: "logic/process_action.php",

					data: { action: "get_server_overview" }

				}).done(function( msg ) {

					$('.content').html( msg );

				});

			}	

		});

		

		return false;

		

	});	

	

	

	// get overview page with all customers

	$("body").on("click", "a[id=mycustomers]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_customers_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// set customizing fields editable for customer

	$('body').on("click","a[id=edit_customer]", function() {

		var customer_id = $(this).attr('rel');

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "show_customer_data", customer_id: customer_id }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

	// get back from customer-data-view to customer-overview

	$('body').on("click","a[id=back_to_mycontent]", function() {

				

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_customers_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

		

	});	

	

    // get overview page with all contents

	$("body").on("click", "a[id=mycontent]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_content_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// open editor for content

	$("body").on("click", "a[id=edit_content]", function() {



		var information = $(this).attr('rel');

		var stringParts = information.split('_');

		var content_id = stringParts[0];

		var language_id = stringParts[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_content_editor", content_id: content_id, language_id: language_id }

		}).done(function( msg ) {

			$('.content').html( msg );

			initCKEditor();

		});

		

		return false;

	});

	

	// delete content

	$("body").on("click", "a[id=delete_content]", function() {



		var information = $(this).attr('rel');

		var stringParts = information.split('_');

		var content_id = stringParts[0];

		var language_id = stringParts[1];

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "delete_content", content_id: content_id, language_id: language_id }

		}).done(function( msg ) {

			// reload content area

			$.ajax({

				type: "POST",

				url: "logic/process_action.php",

				data: { action: "get_content_overview" }

			}).done(function( msg ) {

				$('.content').html( msg );

			});

		});

		

		return false;

	});

	

	// open editor for new content

	$("body").on("click", "a[id=create_new_content]", function() {

	

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "open_new_content_editor" }

		}).done(function( msg ) {

			$('.content').html( msg );

			initCKEditor();

		});

		

		return false;

	});

	

	// open editor for content

	$("body").on("click", "input[type=submit][id=save_content]", function() {



		var content_id = $('input[type=hidden][id=content_id]').val();

		var language_id = $('input[type=hidden][id=language_id]').val();

		var title = $('input[type=text][id=title]').val();

		var text = $('textarea[id=text]').val();

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "update_content", content_id: content_id, language_id: language_id, title: title, text: text }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// open editor for content

	$("body").on("click", "input[type=submit][id=create_content]", function() {



		var title = $('input[type=text][id=title]').val();

		var text = $('textarea[id=text]').val();

		var language_id = $('select[name=language_selection] option:selected').attr('id');

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "create_content", language_id: language_id, title: title, text: text }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// get overview page with all invoices

	$("body").on("click", "a[id=myinvoices]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_invoice_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// save new status

	$("body").on("click", "a[id=change_invoice_status]", function() {

		

		var invoice_id = $(this).attr('rel');

		var status_id = $('select[name=statusbox_'+ invoice_id +'] option:selected').attr('id');

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "change_invoice_status", invoice_id: invoice_id, status_id: status_id }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	// get overview page with shop statistics

	$("body").on("click", "a[id=mystatistics]", function() {

		

		$.ajax({

			type: "POST",

			url: "logic/process_action.php",

			data: { action: "get_statistic_overview" }

		}).done(function( msg ) {

			$('.content').html( msg );

		});

		

		return false;

	});	

	

	

	// logout customer and redirect to main page

	$("body").on("click", "a[id=logout]", function() {

		

		$.ajax({

			type: "POST",

			url: "../logic/process_usermanagement.php",

			data: { action: "logout_backend" }

		}).done(function( msg ) {

			$('#messagearea').html( msg );

			window.location.href = "../index.php";

		});

		

		return false;

	});

	

	// sets current custermenu active 

	$("body").on("click", "a[class=cm]", function(){

		$("a").removeClass("active");

		$(this).addClass("active");

	});

	

	// alert message with

}