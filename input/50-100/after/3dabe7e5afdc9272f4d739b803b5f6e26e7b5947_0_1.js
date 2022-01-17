function(op) {
    return liftDbDeferred(function(db, defer) {
        return op(db)(function(error, res) {
            return (function() {
                if(error) {
                    return defer.reject(error);
                } else {
                    return defer.resolve(res);
                }
            })();
        });
    });
}