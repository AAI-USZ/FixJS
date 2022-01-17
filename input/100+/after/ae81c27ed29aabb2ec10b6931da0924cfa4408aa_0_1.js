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
					var char = 350 - $(this).val().length;
					$(this).nextAll('.help').first().children('.charcount').text('Te quedan ' + char + ' caracteres.');
				});

				$('.sending .fields_wrap .row input').live('blur', function() {
					$(this).nextAll('.help').first().hide();
				});
				$('.sending .fields_wrap .row textarea').live('blur', function() {
					$(this).nextAll('.help').first().hide();
				});

				$('.textarea').live('keyup', function() {
			        var max = 350;
			        var len = $(this).val().length;
			        if (len >= max) {
			            $(this).nextAll('.help').first().children('.charcount').text('Has llegado al máximo de caracteres.');
			        }else {
			            var char = max - len;
			            $(this).nextAll('.help').first().children('.charcount').text('Te quedan ' + char + ' caracteres.');
			        }
			    });
			}