function() {
            page.content = '<input type="text">';
            page.evaluate(function() {
                document.querySelector('input').focus();
            });
            page.sendEvent('keypress', 65);
            var text = page.evaluate(function() {
                return document.querySelector('input').value;
            });
            expect(text).toEqual("A");
        }