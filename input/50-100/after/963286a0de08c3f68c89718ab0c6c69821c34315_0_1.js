function adminPanel_extension_newUser() {
    newuser = $("#newuser").val();
    if (newuser == "") {
        alert(lang_checkUsername);
        return false;
    }
    $.post(adminPanel_extension_path + "processor.php", { axAction: "createUser", axValue: newuser, id: 0 }, 
    function(data) {
        adminPanel_extension_refreshSubtab('users');
        adminPanel_extension_editUser(data);
    });
}