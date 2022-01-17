function() {
        runs(function() {
            page.content = '<input type="text">';
            page.evaluate(function() {
                document.querySelector('input').focus();
            });
            page.sendEvent('keypress', "ABCD");
            var text = page.evaluate(function() {
                return document.querySelector('input').value;
            });
            expect(text).toEqual("ABCD");
        });
    }