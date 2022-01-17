function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.keypress;
            });
            expect(event.which).toEqual(phantom.keys.A);
        }