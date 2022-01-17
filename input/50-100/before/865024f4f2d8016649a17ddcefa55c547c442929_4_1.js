function() {
                var button = simpleTestPage.iframe.contentDocument.getElementsByClassName("montage-button")[0];
                var text = simpleTestPage.iframe.contentDocument.getElementsByClassName("dynamictext")[1];
                expect(button).not.toBeNull();
                expect(button.textContent).toEqual("Button");
                expect(text).not.toBeNull();
                expect(text.textContent).toEqual("Custom Test Value");
            }