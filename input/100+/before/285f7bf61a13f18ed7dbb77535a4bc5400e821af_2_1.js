function GetRoleName() {
    var roleName = $("#hidden_roleName").val();
    if ($("#RoleName").length > 0) { //Church Admin on the page
        roleName = $("#RoleName").val();
    }
    else if ($("#groupAdmin_securityRole").length > 0) { //group admin on the page
        roleName = $("#groupAdmin_securityRole").val();
    }

    return roleName;
}