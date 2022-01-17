function(permissions) {
        transition($("#loading"), $("#content"));

        var permissionsTable = tmpl("authorizationPermissionsTemplate", {
            permissions: permissions
        });

        $("#authorizationUsername").text(username);
        $("#authorizationPermissions").append($(permissionsTable));

        $(".serviceSelector").append($("<option>"));

        for(var service in client._services) {
            $(".serviceSelector").append($("<option>").text(service));
        }
    }