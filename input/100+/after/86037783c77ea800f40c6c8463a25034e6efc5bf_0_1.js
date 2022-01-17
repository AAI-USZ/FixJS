function() {
                it("should contain the original content of the component markup", function() {
                    var originalContent = testPage.test.repetition.originalContent;
                    expect(originalContent.length).toBe(2);
                    expect(originalContent[0].outerHTML).toBe("<h3>Original Content</h3>");
                    expect(originalContent[1].outerHTML).toBe("<p>here</p>");
                });

                it("should set the original content to the domContent of the component before inserting the template", function() {
                    var componentList = testPage.test.componentList,
                        texts = componentList.element.querySelectorAll("*[data-montage-id='text2']");

                    expect(texts.length).toBe(3);
                });
            }