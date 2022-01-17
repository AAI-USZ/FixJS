function () {
        var thew = false;
        var deferred = Q.defer();
        Q.when(deferred.promise, function () {
            threw = true;
            throw new Error("Wah-wah");
        });
        var promise = Q.when(deferred.promise, function (value) {
            expect(value).toEqual(10);
        }, function () {
            expect("not").toEqual("here");
        });
        deferred.resolve(10);
        return promise;
    }