function(data) {
                eval(data);
                ts_ext_reload();
                buzzer_preselect('project',project,projectName,customer,customerName,false);
                buzzer_preselect('activity',activity,activityName,0,0,false);
                $("#ticker_customer").html(customerName);
                $("#ticker_project").html(projectName);
                $("#ticker_activity").html(activityName);
        }