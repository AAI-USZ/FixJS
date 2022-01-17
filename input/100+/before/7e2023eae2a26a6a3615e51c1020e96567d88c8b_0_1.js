function fill_examples() {



		var dir_pattern = $('#naming_dir_pattern').val();

		var name_pattern = $('#naming_name_pattern').val();

		

		var pattern = dir_pattern + '/' + name_pattern;

		var multi = $('#naming_multi_ep :selected').val();

		

		$.get(sbRoot+'/config/postProcessing/testNaming', {pattern: pattern},

			function(data){

				$('#naming_example').text(data+'.ext');

		});



		$.get(sbRoot+'/config/postProcessing/testNaming', {pattern: pattern, multi: multi},

			function(data){

				$('#naming_example_multi').text(data+'.ext');

		});

	}