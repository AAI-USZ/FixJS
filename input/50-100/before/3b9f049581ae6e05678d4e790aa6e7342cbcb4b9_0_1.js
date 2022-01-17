function() {
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
		}