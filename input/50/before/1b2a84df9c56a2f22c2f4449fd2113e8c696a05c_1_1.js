function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.keydown;
            });
            expect(event.which).toEqual(65);
        }