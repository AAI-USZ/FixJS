function ts_ext_reload_activities(project,noUpdateRate, activity, timeSheetEntry) {
  var selected_activity = $('#add_edit_timeSheetEntry_activityID').val();
            $.post(ts_ext_path + "processor.php", { axAction: "reload_activities_options", axValue: 0, id: 0, project:project },
                function(data) { 
                    $("#add_edit_timeSheetEntry_activityID").html(data);
                    $("#add_edit_timeSheetEntry_activityID").val(selected_activity);
                    if (noUpdateRate == undefined)
                    getBestRates();
                    ts_add_edit_validate();
                    if(activity > 0) {
	                    $.getJSON("../extensions/ki_timesheets/processor.php", {
	                        axAction: "budgets",
	                        project_id: project,
	                        activity_id: activity,
	                        timeSheetEntryID: timeSheetEntry
	                      },
	                      function(data) {
	                    	  ts_ext_updateBudget(data);
	                      }
	                     );
                    }
                }
            );
}