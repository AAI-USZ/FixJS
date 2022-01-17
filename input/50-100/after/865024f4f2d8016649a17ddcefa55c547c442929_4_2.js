function() {
                var button0 = repetitionTestPage.iframe.contentDocument.querySelectorAll(".list2 .montage-Button")[0];
                var text0 = repetitionTestPage.iframe.contentDocument.querySelectorAll(".list2 .dynamictext")[0];
                expect(button0).not.toBeNull();
                expect(button0.textContent).toEqual("Button");
                expect(text0).not.toBeNull();
                expect(text0.textContent).toEqual("Custom Test Value");
            }