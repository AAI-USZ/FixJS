function adminPanel_extension_hideDeletedUsers() {
    $.post(adminPanel_extension_path + "processor.php", { axAction: "toggleDeletedUsers", axValue: 0, id: 0 }, 
    function(data) {
        adminPanel_extension_refreshSubtab('users');
    });
}