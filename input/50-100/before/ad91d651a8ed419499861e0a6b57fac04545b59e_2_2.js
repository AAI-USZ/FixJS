function() {
            page.onError = function() { hadError = true };
            page.evaluate(function() {
                caughtError = false;
                setTimeout(function() {
                    try {
                        referenceError
                    } catch(e) {
                        caughtError = true;
                    }
                }, 0)
            });
        }