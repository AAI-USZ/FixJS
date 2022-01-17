function (callback, role) {
            var permissions = fluid.transform(fluid.copy(that.permissions), function (permission) {
                return {
                    resourceName: permission.summary,
                    display: permission.display,
                    permission: fluid.find(fluid.get(role, "fields.permissions"), function (rolePermission) {
                        if (permission.summary === rolePermission.resourceName) {
                            return rolePermission.permission;
                        }
                    }) || "delete"
                };
            });
            fluid.set(role, "fields.permissions", permissions);
            callback(role);
        }