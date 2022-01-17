function(input, date, visualise) {
				var item = input.parents('li'),
					datespan = input.parent(),
					calendar = item.find('div.calendar');
				
				// Call validator
				if(input.attr('data-timestamp') != date) {
					$.ajax({
						type: 'GET',
						dataType: 'json',
						url: Symphony.Context.get('root') + '/symphony/extension/datetime/get/',
						data: { 
							date: date,
							time: Math.min(calendar.find('.timeline').size(), 1)
						},
						success: function(parsed) {
						
							// Valid date
							if(parsed.status == 'valid') {
								input.attr('data-timestamp', parsed.timestamp).val(parsed.date).removeClass('invalid');
							
								// Visualise
								if(visualise === true) {
									item.trigger('visualise', [{
										start: datespan.find('.start').attr('data-timestamp'),
										end: datespan.find('.end').attr('data-timestamp')
									}, input.attr('data-timestamp')]);
								}
							}
							
							// Invalid date
							else {
								input.attr('data-timestamp', '').addClass('invalid');
								visualise(input);
							}
	
							// Store date
							input.data('validated', parsed.date);
							
							// Display status
							displayStatus(datespan);
		
							// Get date context
							contextualise(input);
						}
					});
				}
			}