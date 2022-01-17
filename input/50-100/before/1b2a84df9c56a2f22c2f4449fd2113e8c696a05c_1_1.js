function() {
            page.evaluate(function() {
                window.addEventListener('keydown', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.keydown = event;
                }, false);
            });
            page.sendEvent('keydown', 65);
        }