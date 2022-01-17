function() {
        var hadError    = false;
        var caughtError = false;
        var page        = require('webpage').create();

        runs(function() {
            page.onError = function() { hadError = true; };
            page.evaluate(function() {
                caughtError = false;

                try {
                    referenceError
                } catch(e) {
                    caughtError = true;
                }
            });

            expect(hadError).toEqual(false);
            expect(page.evaluate(function() { return caughtError })).toEqual(true);
        });
    }