function () {
                // place cursor at the beginning of the last line
                myEditor.setCursorPos(len - 1, 0);

                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);

                var lines = defaultContent.split("\n"),
                    len = lines.length;

                lines.push("}");
                var expectedText = lines.join("\n");

                expect(myDocument.getText()).toEqual(expectedText);
                expectCursorAt({line: len, ch: 0}            });
