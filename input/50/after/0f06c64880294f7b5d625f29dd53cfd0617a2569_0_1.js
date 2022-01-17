function(datespan) {
			
				// At least one date is invalid
				if(datespan.find('input.invalid').size() > 0) {
					datespan.addClass('invalid');
				}
				
				// All dates are valid
				else {
					datespan.removeClass('invalid');
				}
			}