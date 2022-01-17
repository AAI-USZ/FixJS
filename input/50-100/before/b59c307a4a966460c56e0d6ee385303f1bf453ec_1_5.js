function (callback, errback) {
            var promise = new Promise();
            this.addCallback(function (results) {
                callback.call(this, results).then(hitch(promise, "callback"), hitch(promise, "errback"));
            });
            this.addErrback(errback);
            return promise;
        }