function proxy(fn) {
        return function(err, result) {
            fn(err, result, false);
        }
    }