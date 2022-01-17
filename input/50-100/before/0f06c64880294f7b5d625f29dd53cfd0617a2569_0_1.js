function(event) {
					var input = $(this);

					// If tab is pressed while the user is in the first
					// date, allow the focus to shifted to the end date
					// instead of the calendar.
					if(event.which == 9 && !event.shiftKey && input.is('.start')) {
						input.nextAll('input.end').show().focus();
						event.preventDefault();
					}
				}