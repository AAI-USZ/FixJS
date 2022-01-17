function(input) {
				var item = input.parents('li'),
					dates = input.parent(),
					end = dates.find('.end');
			
				// Empty dates are valid
				input.removeClass('invalid');

				// Merge with end date
				if(input.is('.start') && end.val() != '') {
					input.val(end.val());
					end.val('');
					
					// Keep errors
					if(end.is('.invalid')) {
						end.removeClass('invalid');
						input.addClass('invalid');					
					}
				}
				
				// Display status
				displayStatus(dates);
				
				// Hide end date
				end.attr('data-timestamp', '').val('').slideUp('fast', function() {
					item.removeClass('range');
				});
			}