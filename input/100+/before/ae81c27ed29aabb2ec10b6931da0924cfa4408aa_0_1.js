function ( data ) {
				// Cambio color de la caja que contiene al radio button
				input.closest('.wrap_types').find('.wrap_type').removeClass('active');
				input.parent('.wrap_type').addClass('active');
				//Introducimos los datos en 'wrap' y los mostramos
				$(wrap).html(data);
				$(wrap).show();
				if ($('.report_data').length < 3) { $('#add_more').show(); }
				$('#submit').show();

				//Mostramos las ayudas en el focus y las ocultamos en blur
				$('.sending .fields_wrap .row input').live('focus', function() {
					$(this).nextAll('.error').first().hide();
					$(this).nextAll('.help').first().show().css('display','block');
				});
				$('.sending .fields_wrap .row textarea').live('focus', function() {
					$(this).nextAll('.error').first().hide();
					$(this).nextAll('.help').first().show().css('display','block');
				});

				$('.sending .fields_wrap .row input').live('blur', function() {
					$(this).nextAll('.help').first().hide();
				});
				$('.sending .fields_wrap .row textarea').live('blur', function() {
					$(this).nextAll('.help').first().hide();
				});
			}