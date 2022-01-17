function () {

        /**
         * Performs setup for a code hint test. Opens a file and set pos.
         * 
         * @param {!string} openFile Project relative file path to open in a main editor.
         * @param {!number} openPos The pos within openFile to place the IP.
         */
        var _initCodeHintTest = function (openFile, openPos) {
            var hostOpened = false,
                err = false,
                workingSet = [];
    
            SpecRunnerUtils.loadProjectInTestWindow(testPath);
    
            runs(function () {
                workingSet.push(openFile);
                SpecRunnerUtils.openProjectFiles(workingSet).done(function (documents) {
                    hostOpened = true;
                }).fail(function () {
                    err = true;
                });
            });
    
            waitsFor(function () { return hostOpened && !err; }, "FILE_OPEN timeout", 1000);
    
            runs(function () {
                var editor = EditorManager.getCurrentFullEditor();
                editor.setCursorPos(openPos.line, openPos.ch);
            });
        };
    
        beforeEach(function () {
            initCodeHintTest = _initCodeHintTest.bind(this);
            SpecRunnerUtils.createTestWindowAndRun(this, function (w) {
                testWindow = w;
    
                // uncomment this line to debug test window:
                //testWindow.brackets.app.showDeveloperTools();
    
                // Load module instances from brackets.test
                CodeHintManager     = testWindow.brackets.test.CodeHintManager;
                EditorManager       = testWindow.brackets.test.EditorManager;
            });
        });
    
        afterEach(function () {
            SpecRunnerUtils.closeTestWindow();
        });

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
                    lineBefore = editor.document.getLine(pos.line);

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
                    lineAfter = editor.document.getLine(pos.line);
                    expect(lineBefore).not.toEqual(lineAfter);
                });
            });
        });
    }