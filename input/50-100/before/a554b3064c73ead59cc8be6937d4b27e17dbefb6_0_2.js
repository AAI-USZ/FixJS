function (fn, interval) {
            var timeoutId;

            // Though the interval is 0 for real-time application, there is a delay between setTimeout calls
            // For detail, see https://developer.mozilla.org/en/window.setTimeout#Minimum_delay_and_timeout_nesting
            interval = interval || 0;

            (function loop() {
                timeoutId = setTimeout(function() {
                    if (fn() === false) {
                        return;
                    }

                    loop();
                }, interval);
            })();

            return function() {
                clearTimeout(timeoutId);
            };
        }