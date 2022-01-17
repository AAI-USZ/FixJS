function(task_id, start_date, end_date ) {
		start = new Date(start_date);
		end = new Date(end_date);
		diff = new TimeSpan(start - grid_start_date);
		// remove weekends from time span // need to fix this // bugs here
		start_index = diff.getDays() - ( 2 * Math.floor(diff.getDays() / 7 ));
		diff = new TimeSpan(end - start);
		length = (diff.getDays()+1) * 22;

		$("#cell_" + task_id + "_" + start_index).append("<div id='task" + task_id + "' class='taskbar' style='width: " + length + "px'></div>");
		$("#task" + task_id).data('task_id', task_id);
		$("#task" + task_id).data('start_date', start_date);
		var wndHeight = $(window).height();
		$("#task" + task_id).resizable({

			start: function(event, ui) {        

  			  },
			stop: function(event, ui) {
					// force resize to end up on a day boundary
					$(event.target).width( Math.floor($(event.target).width() / 22) * 22 + 22);
					update_task($(event.target).data('task_id'), 
							new Date($(event.target).data('start_date')),
						       	Math.floor($(event.target).width() / 22));
					$(event.target).attr('position', 'relative');
					}});
		$("#task" + task_id).draggable({containment: $(".cellcontainer"), axis: "x",
					stop: function(event, ui) {
						// snap to borders
						$(event.target).offset({left: Math.floor($(event.target).offset().left / 22) * 22 + 22 - $(".cellcontainer").scrollLeft() %22,
									top: $(event.target).offset().top});	
						update_task($(event.target).data('task_id'),
							add_workdays_to_date(grid_start_date, 
								Math.floor(($(event.target).offset().left -
									$("#cell_0_0").offset().left  )/ 22)),
							Math.floor($(event.target).width() / 22));	
							}});
	}