function (cb) {
            if (cb) {
                if (exports.isPromiseLike(cb)) {
                    cb = hitch(cb, "errback");
                }
                if (this.__fired && this.__error) {
                    cb.apply(this, this.__error);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
        }