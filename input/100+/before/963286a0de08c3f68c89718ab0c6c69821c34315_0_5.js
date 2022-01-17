function ap_ext_deleteProject(id) {
    $.post(ap_ext_path + "processor.php", { axAction: "deletePct", axValue: 0, id: id }, 
        function(data) {
            if (confirm(data)) {
                if (currentRecording == -1 && selected_pct == id) {
                  $('#buzzer').addClass('disabled');
                  selected_pct = false;
                  $("#sel_pct").html('');
                }
                $.post(ap_ext_path + "processor.php", {axAction: "deletePct", axValue: 1, id: id }, 
                    function() { ap_ext_refreshSubtab('pct');
                 hook_chgPct(); }
                );
            }
        }
    );
}