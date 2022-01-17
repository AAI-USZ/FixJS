function() {
            page.onError = function() { hadError = true };
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
        }