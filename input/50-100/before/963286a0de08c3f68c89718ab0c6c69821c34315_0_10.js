function(data) {
            if (confirm(data)) {
                if (currentRecording == -1 && selected_knd == id) {
                  $('#buzzer').addClass('disabled');
                  selected_knd = false;
                  $("#sel_knd").html('');
                }
                $.post(ap_ext_path + "processor.php", {axAction: "deleteKnd", axValue: 1, id: id }, 
                    function() { ap_ext_refreshSubtab('knd');
                 hook_chgKnd(); }
                );
            }
        }