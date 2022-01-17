function() {

		// Init Data

		initProfile();

		

		// Load

		based = JSON.parse(Base64.decode(getCookie('equip' + getCookie('order'))));

		

		// Reset

		$('input').val(0);

		$('.minor_dps').text(0);

		

		// Based

		reset(based, 'based');

		totalAttribute(based, 'based');

		calculate(based, 'based');

		calculateMinorDPS('based');

		

		// Replacement

		createDiffReplacement();

		reset(temp, 'replacement');

		totalAttribute(replacement, 'replacement');

		calculate(replacement, 'replacement');

		calculateMinorDPS('replacement');

		

		// Setting

		for(var index = 1;index <= 5;index++)

			$('#setting .' + index).val(getCookie('equip' + index));

		

		$('#setting textarea').change(function() {

			var key = $(this).attr('class');

			var data = Base64.decode($(this).val());



			if(typeof(JSON.parse(data)) == 'object') {

				setCookie('equip' + key, $(this).val());



				if(getCookie('order') == key) {

					based = JSON.parse(Base64.decode(getCookie('equip' + key)));

					

					// Based

					reset(based, 'based');

					totalAttribute(based, 'based');

					calculate(based, 'based');

					calculateMinorDPS('based');

					

					// Replacement

					createDiffReplacement();

					reset(temp, 'replacement');

					totalAttribute(replacement, 'replacement');

					calculate(replacement, 'replacement');

					calculateMinorDPS('replacement');

				}

			}

		});



		// If User change character profile

		$('#equip .based .order').change(function() {

			setCookie('order', $(this).val());

			

			based = JSON.parse(Base64.decode(getCookie('equip' + getCookie('order'))));



			// Based

			reset(based, 'based');

			totalAttribute(based, 'based');

			calculate(based, 'based');

			calculateMinorDPS('based');

			

			// Replacement

			createDiffReplacement();

			reset(temp, 'replacement');

			totalAttribute(replacement, 'replacement');

			calculate(replacement, 'replacement');

			calculateMinorDPS('replacement');

		});

		

		$('#equip .replacement .order').change(function() {

			if($(this).val() == 0) {

				temp = JSON.parse(template);

				diff_equip = {

					skill: false,

					belt: false,

					boots: false,

					braces: false,

					chest: false,

					glovers: false,

					helm: false,

					pants: false,

					shoulders: false,

					amulet: false,

					ring_1: false,

					ring_2: false,

					weapon_1: false,

					weapon_2: false

				};

			}

			else {

				temp = JSON.parse(Base64.decode(getCookie('equip' + $(this).val())));

			}

			

			createDiffReplacement();

			reset(temp, 'replacement');

			totalAttribute(replacement, 'replacement');

			calculate(replacement, 'replacement');

			calculateMinorDPS('replacement');

		});



		// Based

		$('#based .skill input').change(function() {

			var key = $(this).attr('class');

			

			based['skill'][key] = parseFloat($(this).val());

			$(this).val(based['skill'][key]);

			based['skill'][key] = $(this).val();

	

			if(based['skill'][key] == 'NaN' || based['skill'][key] < 0)

				based['skill'][key] = 0;

	

			$(this).val(based['skill'][key]);



			setCookie('equip' + getCookie('order'), Base64.encode(JSON.stringify(based)));

			$('#setting .' + getCookie('order')).val(getCookie('equip' + getCookie('order')));



			// Based

			reset(based, 'based');

			totalAttribute(based, 'based');

			calculate(based, 'based');

			calculateMinorDPS('based');

			

			// Replacement

			createDiffReplacement();

			reset(temp, 'replacement');

			totalAttribute(replacement, 'replacement');

			calculate(replacement, 'replacement');

			calculateMinorDPS('replacement');

		});

	

		$('#equip .based input').change(function() {

			var key1 = $(this).parent().parent().attr('class');

			var key2 = $(this).attr('class');

			

			based[key1][key2] = parseFloat($(this).val());

			$(this).val(based[key1][key2]);

			based[key1][key2] = $(this).val();

	

			if(based[key1][key2] == 'NaN' || based[key1][key2] < 0)

				based[key1][key2] = 0;

	

			$(this).val(based[key1][key2]);

		

			setCookie('equip' + getCookie('order'), Base64.encode(JSON.stringify(based)));

			$('#setting .' + getCookie('order')).val(getCookie('equip' + getCookie('order')));

	

			// Based

			reset(based, 'based');

			totalAttribute(based, 'based');

			calculate(based, 'based');

			calculateMinorDPS('based');

			

			// Replacement

			createDiffReplacement();

			reset(temp, 'replacement');

			totalAttribute(replacement, 'replacement');

			calculate(replacement, 'replacement');

			calculateMinorDPS('replacement');

		});



		// Replacement

		$('#replacement .skill input').change(function() {

			var key = $(this).attr('class');

			

			temp['skill'][key] = parseFloat($(this).val());

			$(this).val(temp['skill'][key]);

			temp['skill'][key] = $(this).val();

	

			if(temp['skill'][key] == 'NaN' || temp['skill'][key] < 0)

				temp['skill'][key] = 0;

	

			$(this).val(temp['skill'][key]);

			

			diff_equip['skill'] = false;

			$.each($('#replacement .skill input'), function() {

				if(parseFloat($(this).val()) > 0)

					diff_equip['skill'] = true;

			});

			

			// Replacement

			createDiffReplacement();

			reset(temp, 'replacement');

			totalAttribute(replacement, 'replacement');

			calculate(replacement, 'replacement');

			calculateMinorDPS('replacement');

		});



		$('#equip .replacement input').change(function() {

			var key1 = $(this).parent().parent().attr('class');

			var key2 = $(this).attr('class');

			

			temp[key1][key2] = parseFloat($(this).val());

			$(this).val(temp[key1][key2]);

			temp[key1][key2] = $(this).val();

	

			if(temp[key1][key2] == 'NaN' || temp[key1][key2] < 0)

				temp[key1][key2] = 0;

	

			$(this).val(temp[key1][key2]);

			

			diff_equip[key1] = false;

			$.each($('#equip .replacement .' + key1 + ' input'), function() {

				if(parseFloat($(this).val()) > 0)

					diff_equip[key1] = true;

			});

			

			// Replacement

			createDiffReplacement();

			reset(temp, 'replacement');

			totalAttribute(replacement, 'replacement');

			calculate(replacement, 'replacement');

			calculateMinorDPS('replacement');

		});

	}