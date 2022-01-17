function () {

            it("should initialize with content", function () {
                // verify editor content
                expect(myEditor._getText()).toEqual(content);
            });
            
            // FUTURE: this should really be in a Document unit test, but there's no "official"
            // way to create the model for a Document without manually creating an Editor, so we're
            // testing this here for now until we get a real central model.
            it("should trigger a synchronous Document change event when an edit is performed", function () {
                var changeFired = false;
                function changeHandler(event, doc, changeList) {
                    $(myDocument).off("change", changeHandler);
                    changeFired = true;
                    expect(doc).toBe(myDocument);
                    expect(changeList.from).toEqual({line: 0, ch: 0});
                    expect(changeList.to).toEqual({line: 1, ch: 0});
                    expect(changeList.text).toEqual(["new content"]);
                    expect(changeList.next).toBe(undefined);
                }
                $(myDocument).on("change", changeHandler);
                myEditor._setText("new content");
                expect(changeFired).toBe(true);
            });

        }