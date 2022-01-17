function adminPanel_extension_deleteGroup(id) {
    $.post(adminPanel_extension_path + "processor.php", { axAction: "deleteGroup", axValue: 0, id: id }, 
        function(data) {
            if (confirm(data)) {
                $.post(adminPanel_extension_path + "processor.php", {axAction: "deleteGroup", axValue: 1, id: id }, 
                    function() { adminPanel_extension_refreshSubtab('groups'); }
                );
            }
        }
    );
}