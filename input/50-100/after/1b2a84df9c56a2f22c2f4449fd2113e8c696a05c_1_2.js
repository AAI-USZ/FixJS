function() {
            page.evaluate(function() {
                window.addEventListener('keyup', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.keyup = event;
                }, false);
            });
            page.sendEvent('keyup', phantom.keys.A);
        }