function () {
            var deferred = when.defer();

            // THIS LINE IS NOT SENDING THE REQUEST TO THE SERVER
            console.log('emit session-client#end')
            this._privatePubsubClient.emit("end");
            this.onEnd(deferred.resolve, deferred.reject);
            return deferred.promise;
        }