function (that, options) {
        var type = that.options.recordType;
        if (!type) {
            return;
        }
        fluid.each(options.userLogin.permissions[type], function (permission) {
            that[fluid.model.composeSegments(type, permission, "tag")] = fluid.typeTag(fluid.model.composeSegments(type, permission));
        });
    }