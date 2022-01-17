function(data) {
            if (confirm(data)) {
                if (currentRecording == -1 && selected_project == id) {
                  $('#buzzer').addClass('disabled');
                  selected_project = false;
                  $("#sel_project").html('');
                }
                $.post(adminPanel_extension_path + "processor.php", {axAction: "deleteProject", axValue: 1, id: id }, 
                    function() { adminPanel_extension_refreshSubtab('projects');
                 hook_projects_changed(); }
                );
            }
        }