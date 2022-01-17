function fill_examples() {



		var pattern = $('#naming_pattern').val();

		var multi = $('#naming_multi_ep :selected').val();

		

		$.get(sbRoot+'/config/postProcessing/testNaming', {pattern: pattern},

			function(data){

				$('#naming_example').text(data+'.ext');

		});



		$.get(sbRoot+'/config/postProcessing/testNaming', {pattern: pattern, multi: multi},

				function(data){

					$('#naming_example_multi').text(data+'.ext');

		});



		$.get(sbRoot+'/config/postProcessing/isNamingValid', {pattern: pattern, multi: multi},

				function(data){

					if (data == "invalid")

						$('#temp_color_div').css('background-color', 'red');

					else if (data == "seasonfolders")

						$('#temp_color_div').css('background-color', 'yellow');

					else

						$('#temp_color_div').css('background-color', 'white');

						

		});

	}