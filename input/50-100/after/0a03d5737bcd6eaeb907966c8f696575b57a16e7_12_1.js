function (that) {
        if (that.options.locked) {
            that.visible = false;
            return;
        }
        that.options.resolver = that.resolver;
        that.options.allOf.push({
            permission: that.options.recordClassPermission,
            oneOf: that.recordTypeManager.recordTypesForCategory(that.options.recordClass)
        });
        that.visible = cspace.permissions.resolveMultiple(that.options);
    }