function ts_ext_reload() {
            $.post(ts_ext_path + "processor.php", { axAction: "reload_timeSheet", axValue: filterUsers.join(":")+'|'+filterCustomers.join(":")+'|'+filterProjects.join(":")+'|'+filterActivities.join(":"), id: 0,
                first_day: new Date($('#pick_in').val()).getTime()/1000, last_day: new Date($('#pick_out').val()).getTime()/1000  },
                function(data) { 
                    $("#timeSheet").html(data);
                
                    ts_ext_set_TableWidths()
                    ts_ext_applyHoverIntent();
                }
            );
}