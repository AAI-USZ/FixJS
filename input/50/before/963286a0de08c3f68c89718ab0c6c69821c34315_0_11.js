function ap_ext_hideDeletedUsers() {
    $.post(ap_ext_path + "processor.php", { axAction: "toggleDeletedUsers", axValue: 0, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('usr');
    });
}