function ap_ext_newGroup() {
    newgroup = $("#newgroup").val();
    if (newgroup == "") {
        alert(lang_checkGroupname);
        return false;
    }
    $.post(ap_ext_path + "processor.php", { axAction: "createGrp", axValue: newgroup, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('grp');
    });
}