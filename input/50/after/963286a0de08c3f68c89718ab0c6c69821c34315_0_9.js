function adminPanel_extension_showDeletedUsers() {
    $.post(adminPanel_extension_path + "processor.php", { axAction: "toggleDeletedUsers", axValue: 1, id: 0 }, 
    function(data) {
        adminPanel_extension_refreshSubtab('users');
    });
}