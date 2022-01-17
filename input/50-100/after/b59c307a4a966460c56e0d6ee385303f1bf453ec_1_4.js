function (callback, errback) {
            if (exports.isPromiseLike(callback)) {
                this.addCallback(callback);
                this.addErrback(callback);
            } else {
                this.addCallback(callback);
                this.addErrback(errback);
            }
            return this;
        }