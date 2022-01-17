function () {
                var lines = defaultContent.split("\n"),
                    len = lines.length,
                    expectedText = '';

                lines.push('}');
                expectedText = lines.join("\n");

                // place cursor at the beginning of the last line
                myEditor.setCursorPos(len-1, 1);

                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);

                expect(myDocument.getText()).toEqual(expectedText);
                expectCursorAt({line: len, ch: 1}            });
