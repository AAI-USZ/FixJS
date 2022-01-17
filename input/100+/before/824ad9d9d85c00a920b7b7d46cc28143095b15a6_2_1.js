function() {
        var hadError = false;

        runs(function() {
            page = new require('webpage').create();
            page.onError = function() { hadError = true };
            page.evaluate(function() {
              setTimeout(function() { referenceError }, 0)
            });
        });

        waits(0);

        runs(function() {
            expect(hadError).toEqual(true);
        });
    }