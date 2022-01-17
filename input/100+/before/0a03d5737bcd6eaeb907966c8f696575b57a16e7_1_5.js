function (auth) {
            return !cspace.permissions.resolve({
                resolver: options.resolver,
                permission: permission,
                target: auth.type
            });
        }