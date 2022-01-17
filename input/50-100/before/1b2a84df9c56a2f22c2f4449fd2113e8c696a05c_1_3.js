function() {
            page.evaluate(function() {
                window.addEventListener('keypress', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.keypress = event;
                }, false);
            });
            page.sendEvent('keypress', 65);
        }