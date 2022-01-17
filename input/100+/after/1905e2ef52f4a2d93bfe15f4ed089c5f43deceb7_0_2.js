function(event, ui) {
					// force resize to end up on a day boundary
					$(event.target).width( Math.floor($(event.target).width() / 22) * 22 + 22);
					update_task($(event.target).data('task_id'), 
							new Date($(event.target).data('start_date')),
						       	Math.floor($(event.target).width() / 22));
					$(event.target).attr('position', 'relative');
					}