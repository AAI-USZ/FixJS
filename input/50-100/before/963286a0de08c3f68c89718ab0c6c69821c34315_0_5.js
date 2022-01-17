function(data) {
            if (confirm(data)) {
                $.post(ap_ext_path + "processor.php", {axAction: "deleteUsr", axValue: 1, id: id }, 
                    function() { 
                      ap_ext_refreshSubtab('usr');
                      ap_ext_refreshSubtab('grp');
                      hook_chgUsr(); }
                );
            }
        }