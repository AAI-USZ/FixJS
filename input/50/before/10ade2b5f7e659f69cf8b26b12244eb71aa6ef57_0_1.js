function () {
            var deferred = when.defer();
            this._privatePubsubClient.emit("end");
            this.onEnd(deferred.resolve, deferred.reject);
            return deferred.promise;
        }