function(event) {
					var input = $(this);

					// Tab key
					if(event.which == 9 && !event.shiftKey && input.is('.start')) {
						var item = input.parents('li');
						
						event.preventDefault();

						// Show end date
						input.nextAll('input.end').show().focus();
		
						// Expand calendar
						if(item.is('.collapsed')) {
							item.trigger('expand.collapsible');
						}
					}
				}