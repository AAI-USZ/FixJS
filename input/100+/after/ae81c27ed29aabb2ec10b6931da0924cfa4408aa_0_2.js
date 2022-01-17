function() {
			$(this).nextAll('.error').first().hide();
			$(this).nextAll('.help').first().show().css('display','block');
			var char = 350 - $(this).val().length;
			$(this).nextAll('.help').first().children('.charcount').text('Te quedan ' + char + ' caracteres.');
		}