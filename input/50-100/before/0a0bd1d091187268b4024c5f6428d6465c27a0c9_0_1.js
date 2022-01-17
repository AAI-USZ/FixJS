function(mas) {
    return liftDeferred(function(defer) {
        var master = deferred.when.apply(deferred, mas);
        master.done(function(_) {
            return defer.resolve(Array.prototype.slice.call(arguments));
        });
        return master.fail(defer.reject);
    });
}