function(data) {
            if (confirm(data)) {
                if (currentRecording == -1 && selected_evt == id) {
                  $('#buzzer').addClass('disabled');
                  selected_evt = false;
                  $("#sel_evt").html('');
                }
                
                $.post(ap_ext_path + "processor.php", {axAction: "deleteEvt", axValue: 1, id: id }, 
                    function() { ap_ext_refreshSubtab('evt');
                 hook_chgEvt(); }
                );
            }
        }