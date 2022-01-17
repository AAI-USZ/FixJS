function ap_ext_newUser() {
    newuser = $("#newuser").val();
    if (newuser == "") {
        alert(lang_checkUsername);
        return false;
    }
    $.post(ap_ext_path + "processor.php", { axAction: "createUsr", axValue: newuser, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('usr');
        ap_ext_editUser(data);
    });
}