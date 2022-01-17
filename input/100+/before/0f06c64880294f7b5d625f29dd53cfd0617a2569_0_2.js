function(parsed) {
						
							// Valid date
							if(parsed.status == 'valid') {
								input.attr('data-timestamp', parsed.timestamp).val(parsed.date).removeClass('invalid');
							
								// Visualise
								if(visualise === true) {
									item.trigger('visualise', [{
										start: dates.find('.start').attr('data-timestamp'),
										end: dates.find('.end').attr('data-timestamp')
									}, input.attr('data-timestamp')]);
								}
							}
							
							// Invalid date
							else {
								input.attr('data-timestamp', '').addClass('invalid');
								
								// Clear
								calendar.slideUp('fast');		
							}
	
							// Store date
							input.data('validated', parsed.date);
							
							// Display status
							displayStatus(dates);
		
							// Get date context
							contextualise(input);
						}