function(dates) {
			
				// At least one date is invalid
				if(dates.find('input.invalid').size() > 0) {
					dates.addClass('invalid');
				}
				
				// All dates are valid
				else {
					dates.removeClass('invalid');
				}
			}