function ap_ext_showDeletedUsers() {
    $.post(ap_ext_path + "processor.php", { axAction: "toggleDeletedUsers", axValue: 1, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('usr');
    });
}