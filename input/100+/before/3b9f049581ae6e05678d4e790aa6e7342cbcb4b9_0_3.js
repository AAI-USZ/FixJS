function() {
			var key1 = $(this).parent().parent().attr('class');
			var key2 = $(this).attr('class');
			
			based[key1][key2] = parseFloat($(this).val());
			$(this).val(based[key1][key2]);
			based[key1][key2] = $(this).val();
	
			if(based[key1][key2] == 'NaN')
				based[key1][key2] = 0;
	
			if(based[key1][key2] < 0)
				based[key1][key2] = 0;
	
			$(this).val(based[key1][key2]);
	
			saveProfile();
			totalAttribute(based, 'based');
			diff();
			totalAttribute(replacement, 'replacement');
			calculate(based, 'based');
			calculate(replacement, 'replacement');
		}