function (err, id) {
                if (id) {
                    defineReadonlyProp(obj, 'id', id);
                    addToCache(this.constructor, obj);
                }
                done.call(this, function () {
                    if (callback) {
                        callback(err, obj);
                    }
                });
            }