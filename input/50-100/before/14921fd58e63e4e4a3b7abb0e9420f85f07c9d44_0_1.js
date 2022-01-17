function() {
                expect(test.range_input1.value).toBe(0);

                var eventInfo = {
                    target: test.range_input1.element,
                    clientX: test.range_input1.element.offsetLeft + 30,
                    clientY: test.range_input1.element.offsetTop + 5
                };

                testPage.clickOrTouch(eventInfo);

                expect(test.range_input1.value).toBeGreaterThan(0);
            }