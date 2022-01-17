function(input) {
				var item = input.parents('li'),
					datespan = input.parent(),
					end = datespan.find('.end');
			
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
				displayStatus(datespan);
				
				// Hide end date
				end.attr('data-timestamp', '').val('').slideUp('fast', function() {
					item.removeClass('range');
				});
			}