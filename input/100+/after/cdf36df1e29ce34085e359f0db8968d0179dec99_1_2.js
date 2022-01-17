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

        that.set = function (model, callback) {
            // Wrap callback with response parser.
            var wrappedCallback = function (role) {
                that.responseParser(role);
                callback(role);
            };

            that.options.csid = model.csid = model.csid || that.options.csid || "";
            var source = that.sourceFull || that.source,
                save = that.options.csid ? "put" : "set";
            source[save](model, {
                csid: that.options.csid,
                vocab: cspace.vocab.resolve({
                    model: null,
                    recordType: that.options.recordType,
                    vocab: that.vocab
                })
            }, function (data) {
                if (data.csid) {
                    that.options.csid = that.options.csid || data.csid;
                }
                wrappedCallback(data);
            });
        };
    }