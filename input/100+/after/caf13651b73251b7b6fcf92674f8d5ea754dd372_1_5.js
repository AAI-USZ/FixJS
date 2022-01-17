function() {
            var text = texts[i];
            var dataUrl = 'data:text/plain;charset=' + text.codec + ';base64,' + text.base64;
            var page = new WebPage();
            var decodedText;
            page.open(dataUrl, function(status) {
                decodedText = page.evaluate(function() {
                    return document.getElementsByTagName('pre')[0].innerText;
                });
                page.release();
            });
            it("Should support text codec " + text.codec, function() {
                expect(decodedText.match("^" + text.reference) == text.reference).toEqual(true);
            });
        }