function() {
        var error;
        phantom.onError = function(e) { error = e };

        runs(function() {
            setTimeout(function() { zomg }, 0);
        });

        waits(0);

        runs(function() {
            expect(error.toString()).toEqual("ReferenceError: Can't find variable: zomg");
            phantom.onError = phantom.defaultErrorHandler;
        });
    }