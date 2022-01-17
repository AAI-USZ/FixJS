function(data) {
            if (confirm(data)) {
                if (currentRecording == -1 && selected_activity == id) {
                  $('#buzzer').addClass('disabled');
                  selected_activity = false;
                  $("#selected_activity").html('');
                }
                
                $.post(adminPanel_extension_path + "processor.php", {axAction: "deleteActivity", axValue: 1, id: id }, 
                    function() { adminPanel_extension_refreshSubtab('activities');
                 hook_activities_changed(); }
                );
            }
        }