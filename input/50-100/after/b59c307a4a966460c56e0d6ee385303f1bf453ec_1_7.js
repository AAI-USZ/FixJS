function (cb) {
            if (cb) {
                if (exports.isPromiseLike(cb)) {
                    cb = hitch(cb, "errback");
                }
                if (this.__fired && this.__errors.length) {
                    cb.call(this, this.__errors);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
            return this;
        }