function(event, ui) {
						// snap to borders
						$(event.target).offset({left: Math.floor($(event.target).offset().left / 22) * 22,
									top: $(event.target).offset().top});	
						update_task($(event.target).data('task_id'),
							add_workdays_to_date(grid_start_date, 
								Math.floor(($(event.target).offset().left -
									 $("#cell_0_0").offset().left  )/ 22)),
							Math.floor($(event.target).width() / 22));	
							}