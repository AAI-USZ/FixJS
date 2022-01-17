function (cb) {
            this.addCallback(cb);
            if (exports.isPromiseLike(cb)) {
                this.addErrback(hitch(cb, "callback"));
            } else {
                this.addErrback(cb);
            }

            return this;
        }