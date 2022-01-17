function (done) {

            var data = this.toObject(true);  // Added this to fix the beforeCreate trigger not fire.
                                             // The fix is per issue #72 and the fix was found by by5739.

            this._adapter().create(modelName, this.constructor._forDB(data), function (err, id) {
                if (id) {
                    defineReadonlyProp(obj, 'id', id);
                    addToCache(this.constructor, obj);
                }
                done.call(this, function () {
                    if (callback) {
                        callback(err, obj);
                    }
                });
            }.bind(this));
        }