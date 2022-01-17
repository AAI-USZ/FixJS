function(task_id, start_date, duration){
		plugin.settings.tasklist.tasks[task_id].duration = duration + " days";
		$('#task' + task_id + "_duration").text(duration + " days"); 
		plugin.settings.tasklist.tasks[task_id].start_date = start_date;
	
		plugin.settings.tasklist.tasks[task_id].start_date = start_date.toString('M/d/yyyy');
		$('#task' + task_id + "_start_date").text(start_date.toString('M/d/yyyy'));

		end_date = add_workdays_to_date(start_date, duration-1);
		plugin.settings.tasklist.tasks[task_id].end_date = end_date.toString('M/d/yyyy');
		$('#task' + task_id + "_end_date").text(end_date.toString('M/d/yyyy'));

		$("#task" + task_id).data('start_date', start_date);
	}