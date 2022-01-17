function(event) {
				var input = $(this),
					date = input.val(),
					validated = input.data('validated');
				
				// Empty date
				if(date == '') {
					empty(input);
				}
				
				// Validate
				else if(date != validated) {
					validate(input, date, true);			
				}			
			}