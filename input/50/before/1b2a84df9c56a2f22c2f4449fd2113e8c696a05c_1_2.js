function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.keyup;
            });
            expect(event.which).toEqual(65);
        }