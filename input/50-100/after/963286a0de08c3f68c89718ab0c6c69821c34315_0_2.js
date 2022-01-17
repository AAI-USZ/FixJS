function adminPanel_extension_newGroup() {
    newgroup = $("#newgroup").val();
    if (newgroup == "") {
        alert(lang_checkGroupname);
        return false;
    }
    $.post(adminPanel_extension_path + "processor.php", { axAction: "createGroup", axValue: newgroup, id: 0 }, 
    function(data) {
        adminPanel_extension_refreshSubtab('groups');
    });
}