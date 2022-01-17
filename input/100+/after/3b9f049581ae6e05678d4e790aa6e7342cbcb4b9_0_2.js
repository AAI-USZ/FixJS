function() {
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
			
			// Minor DPS
			calculateMinorDPS('based');
			//calculateMinorDPS('replacement');
		}