function () {
        var roleName = $("#RoleId option[value='" + $("#RoleId").val() + "']").text();
        window.location.replace("/Report/PeopleList?roleId=" + $("#RoleId").val() + "&roleName=" + roleName);
    }