function () {

        describe("HTML Tests", function () {

            it("should show code hints menu and insert text at IP", function () {

                var editor,
                    pos = {line: 3, ch: 1},
                    lineBefore,
                    lineAfter;

                // minimal markup with an open '<' before IP
                // Note: line for pos is 0-based and editor lines numbers are 1-based
                initCodeHintTest("test1.html", pos);

                // simulate Ctrl+space keystroke to invoke code hints menu
                runs(function () {
                    var e = $.Event("keydown");
                    e.keyCode = 32;      // spacebar key
                    e.ctrlKey = true;

                    editor = EditorManager.getCurrentFullEditor();
                    expect(editor).toBeTruthy();

                    // get text before insert operation
                    lineBefore = editor._codeMirror.getLine(pos.line);

                    CodeHintManager.handleKeyEvent(editor, e);

                    var codeHintList = CodeHintManager._getCodeHintList();
                    expect(codeHintList).toBeTruthy();
                    expect(codeHintList.isOpen()).toBe(true);
                });

                // simulate Enter key to insert code hint into doc
                runs(function () {
                    var e = $.Event("keydown");
                    e.keyCode = 13;      // Enter/return key

                    editor = EditorManager.getCurrentFullEditor();
                    expect(editor).toBeTruthy();

                    CodeHintManager.handleKeyEvent(editor, e);

                    // doesn't matter what was inserted, but line should be different
                    var newPos = editor.getCursorPos();
                    lineAfter = editor._codeMirror.getLine(pos.line);
                    expect(lineBefore).not.toEqual(lineAfter);
                });
            });
        });
    }