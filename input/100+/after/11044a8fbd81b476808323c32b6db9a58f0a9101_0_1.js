function() {
        runs(function() {
            page.evaluate(function() {
                window.addEventListener('keydown', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.keydown = event;
                }, false);
            });
            page.sendEvent('keydown', 65);
        });

        waits(50);

        runs(function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.keydown;
            });
            expect(event.which).toEqual(65);
        });
    }