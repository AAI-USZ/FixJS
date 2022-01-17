function() {
		// Load Data
		loadProfile();
		
		// Load
		order = character['order'];
		based = character[order];
		
		reset();
		totalAttribute(based, 'based');
		diff();
		totalAttribute(replacement, 'replacement');
		calculate(based, 'based');
		calculate(replacement, 'replacement');

		// If User change character profile
		$('.character .order').change(function() {
			order = $(this).val();
			based = character[order];
			
			// Reset Profile
			reset();
			totalAttribute(based, 'based');
			diff();
			totalAttribute(replacement, 'replacement');
			calculate(based, 'based');
			calculate(replacement, 'replacement');
			
			// Save data
			saveProfile();
		});

		// Based
		$('#based .skill input').change(function() {
			var key = $(this).attr('class');
			
			based['skill'][key] = parseFloat($(this).val());
			$(this).val(based['skill'][key]);
			based['skill'][key] = $(this).val();
	
			if(based['skill'][key] == 'NaN')
				based['skill'][key] = 0;
	
			if(based['skill'][key] < 0)
				based['skill'][key] = 0;
	
			$(this).val(based['skill'][key]);
	
			saveProfile();
			diff();
			calculate(based, 'based');
			calculate(replacement, 'replacement');
		});
	
		$('#equip .based input').change(function() {
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
		});

		// Replacement
		$('#replacement .skill input').change(function() {
			var key = $(this).attr('class');
			
			temp['skill'][key] = parseFloat($(this).val());
			$(this).val(temp['skill'][key]);
			temp['skill'][key] = $(this).val();
	
			if(temp['skill'][key] == 'NaN')
				temp['skill'][key] = 0;
	
			if(temp['skill'][key] < 0)
				temp['skill'][key] = 0;
	
			$(this).val(temp['skill'][key]);
			
			diff_equip['skill'] = false;
			$.each($('#replacement .skill input'), function() {
				if(parseFloat($(this).val()) > 0)
					diff_equip['skill'] = true;
			});
			
			diff();
			calculate(replacement, 'replacement');
		});

		$('#equip .replacement input').change(function() {
			var key1 = $(this).parent().parent().attr('class');
			var key2 = $(this).attr('class');
			
			temp[key1][key2] = parseFloat($(this).val());
			$(this).val(temp[key1][key2]);
			temp[key1][key2] = $(this).val();
	
			if(temp[key1][key2] == 'NaN')
				temp[key1][key2] = 0;
	
			if(temp[key1][key2] < 0)
				temp[key1][key2] = 0;
	
			$(this).val(temp[key1][key2]);
			
			diff_equip[key1] = false;
			$.each($('#equip .replacement .' + key1 + ' input'), function() {
				if(parseFloat($(this).val()) > 0)
					diff_equip[key1] = true;
			});
			
			diff();
			totalAttribute(replacement, 'replacement');
			calculate(replacement, 'replacement');
		});
	}