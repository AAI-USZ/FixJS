function() {

			var key = $(this).attr('class');

			

			based['skill'][key] = parseFloat($(this).val());

			$(this).val(based['skill'][key]);

			based['skill'][key] = $(this).val();

	

			if(based['skill'][key] == 'NaN' || based['skill'][key] < 0)

				based['skill'][key] = 0;

	

			$(this).val(based['skill'][key]);



			setCookie('equip' + getCookie('order'), Base64.encode(JSON.stringify(based)));



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