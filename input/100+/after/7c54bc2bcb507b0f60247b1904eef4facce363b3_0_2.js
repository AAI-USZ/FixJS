function() {

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

		}