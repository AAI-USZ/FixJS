function() {
        var lastError = null;

        page = new require('webpage').create();
        page.onError = function(e) { lastError = e };

        runs(function() {
            page.evaluate(function() {
                setTimeout(function() { referenceError }, 0)
            });
        });

        waits(0);

        runs(function() {
            expect(lastError.toString()).toEqual("ReferenceError: Can't find variable: referenceError");

            page.evaluate(function() { referenceError2 });
            expect(lastError.toString()).toEqual("ReferenceError: Can't find variable: referenceError2");

            page.evaluate(function() { throw "foo" });
            expect(lastError).toEqual("foo");

            page.evaluate(function() { throw Error("foo") });
            expect(lastError.toString()).toEqual("Error: foo");
        });
    }