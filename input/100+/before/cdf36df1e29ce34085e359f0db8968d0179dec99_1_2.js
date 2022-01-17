function (that) {
        that.get = function (callback) {
            if (!that.permissions) {
                that.sourcePermissions.get({}, function (data) {
                    that.events.afterGetSourcePermissions.fire(data);
                });
            }
            if (!that.options.csid) {
                that.events.afterGetSource.fire(callback, cspace.util.getBeanValue({}, that.options.recordType, that.options.schema));
                return;
            }
            that.source.get({
                csid: that.options.csid
            }, function (data) {
                that.events.afterGetSource.fire(callback, data);
            });
        };
    }