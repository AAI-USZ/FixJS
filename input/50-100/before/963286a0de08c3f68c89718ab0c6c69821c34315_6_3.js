function(data) { 
                    $("#add_edit_zef_evt_ID").html(data);
                    $("#add_edit_zef_evt_ID").val(selected_evt);
                    if (noUpdateRate == undefined)
                    getBestRates();
                    ts_add_edit_validate();
                    if(evt > 0) {
	                    $.getJSON("../extensions/ki_timesheets/processor.php", {
	                        axAction: "budgets",
	                        project_id: pct,
	                        event_id: evt,
	                        zef_id: zef
	                      },
	                      function(data) {
	                    	  ts_ext_updateBudget(data);
	                      }
	                     );
                    }
                }