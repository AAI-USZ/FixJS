f            it("should duplicate whole line if no selection", function () {
                // place cursor in middle of line 1
                myEditor.setCursorPos(1, 10);
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines.splice(1, 0, "    function bar() {");
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectCursorAt({line: 2, ch: 10});
            });

            it("should duplicate line + \n if selected line is at end of file", function () {
                var lines = defaultContent.split("\n"),
                    len = lines.length;

                // place cursor at the beginning of the last line
                myEditor.setCursorPos(len - 1, 0);

                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);

                lines.push("}");
                var expectedText = lines.join("\n");

                expect(myDocument.getText()).toEqual(expectedText);
                expectCursorAt({line: len, ch: 0});
            });
            
            it("should duplicate first line", function () {
                // place cursor at start of line 0
                myEditor.setCursorPos(0, 0);
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines.splice(0, 0, "function foo() {");
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectCursorAt({line: 1, ch: 0});
            });
            
            it("should duplicate empty line", function () {
                // place cursor on line 6
                myEditor.setCursorPos(6, 0);
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines.splice(6, 0, "");
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectCursorAt({line: 7, ch: 0});
            });
            
            it("should duplicate selection within a line", function () {
                // select "bar" on line 1
                myEditor.setSelection({line: 1, ch: 13}, {line: 1, ch: 16});
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines[1] = "    function barbar() {";
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectSelection({start: {line: 1, ch: 16}, end: {line: 1, ch: 19}});
            });
            
            it("should duplicate when entire line selected, excluding newline", function () {
                // select all of line 1, EXcluding trailing \n
                myEditor.setSelection({line: 1, ch: 0}, {line: 1, ch: 20});
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines[1] = "    function bar() {    function bar() {";
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectSelection({start: {line: 1, ch: 20}, end: {line: 1, ch: 40}});
            });
            it("should duplicate when entire line selected, including newline", function () {
                // select all of line 1, INcluding trailing \n
                myEditor.setSelection({line: 1, ch: 0}, {line: 2, ch: 0});
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines.splice(1, 0, "    function bar() {");
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectSelection({start: {line: 2, ch: 0}, end: {line: 3, ch: 0}});
            });
            
            it("should duplicate when multiple lines selected", function () {
                // select lines 1-3
                myEditor.setSelection({line: 1, ch: 0}, {line: 4, ch: 0});
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines.splice(1, 0, "    function bar() {",
                                   "        ",
                                   "        a();");
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectSelection({start: {line: 4, ch: 0}, end: {line: 7, ch: 0}});
            });
            
            it("should duplicate selection crossing line boundary", function () {
                // select from middle of line 1 to middle of line 3
                myEditor.setSelection({line: 1, ch: 13}, {line: 3, ch: 11});
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var lines = defaultContent.split("\n");
                lines.splice(1, 3, "    function bar() {",
                                   "        ",
                                   "        a()bar() {",
                                   "        ",
                                   "        a();");
                var expectedText = lines.join("\n");
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectSelection({start: {line: 3, ch: 11}, end: {line: 5, ch: 11}});
            });
            
            it("should duplicate after select all", function () {
                myEditor.setSelection({line: 0, ch: 0}, {line: 7, ch: 1});
                
                CommandManager.execute(Commands.EDIT_DUPLICATE, myEditor);
                
                var expectedText = defaultContent + defaultContent;
                
                expect(myDocument.getText()).toEqual(expectedText);
                expectSelection({start: {line: 7, ch: 1}, end: {line: 14, ch: 1}});
            });
        });
