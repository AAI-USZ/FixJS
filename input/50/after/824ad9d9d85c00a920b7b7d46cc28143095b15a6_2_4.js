function() {
            expect(error.toString()).toEqual("ReferenceError: Can't find variable: zomg");
            phantom.onError = phantom.defaultErrorHandler;
        }