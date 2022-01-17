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