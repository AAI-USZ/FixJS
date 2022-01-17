function (require, exports, module) {
    'use strict';
    
    // Load dependent modules
    var CommandManager,      // loaded from brackets.test
        Commands,            // loaded from brackets.test
        EditorManager,       // loaded from brackets.test
        DocumentManager,     // loaded from brackets.test
        SpecRunnerUtils     = require("spec/SpecRunnerUtils");
    
    
    describe("Document", function () {

        var testPath = SpecRunnerUtils.getTestPath("/spec/Document-test-files"),
            testWindow;

        beforeEach(function () {
            SpecRunnerUtils.createTestWindowAndRun(this, function (w) {
                testWindow = w;

                // Load module instances from brackets.test
                CommandManager      = testWindow.brackets.test.CommandManager;
                Commands            = testWindow.brackets.test.Commands;
                EditorManager       = testWindow.brackets.test.EditorManager;
                DocumentManager     = testWindow.brackets.test.DocumentManager;
                
                SpecRunnerUtils.loadProjectInTestWindow(testPath);
            });
        });

        afterEach(function () {
            SpecRunnerUtils.closeTestWindow();
        });
        
        var JS_FILE   = testPath + "/test.js",
            CSS_FILE  = testPath + "/test.css",
            HTML_FILE = testPath + "/test.html";


        describe("ref counting", function () {
            
            // TODO: additional, simpler ref counting test cases such as Live Development, open/close inline editor (refs from
            //  both editor & rule list TextRanges), navigate files w/o adding to working set, etc.
            
            it("should clean up (later) a master Editor auto-created by calling read-only Document API, if Editor not used by UI", function () {
                var promise,
                    cssDoc,
                    cssMasterEditor;
                
                runs(function () {
                    promise = CommandManager.execute(Commands.FILE_ADD_TO_WORKING_SET, {fullPath: HTML_FILE});
                    waitsForDone(promise, "Open into working set");
                });
                runs(function () {
                    // Open inline editor onto test.css's ".testClass" rule
                    promise = SpecRunnerUtils.toggleQuickEditAtOffset(EditorManager.getCurrentFullEditor(), {line: 8, ch: 4});
                    waitsForDone(promise, "Open inline editor");
                });
                runs(function () {
                    expect(DocumentManager.findInWorkingSet(CSS_FILE)).toBe(-1);
                    expect(DocumentManager.getOpenDocumentForPath(CSS_FILE)).toBeTruthy();
                    
                    // Force creation of master editor for CSS file
                    cssDoc = DocumentManager.getOpenDocumentForPath(CSS_FILE);
                    expect(cssDoc._masterEditor).toBeFalsy();
                    DocumentManager.getOpenDocumentForPath(CSS_FILE).getLine(0);
                    expect(cssDoc._masterEditor).toBeTruthy();
                    
                    // Close inline editor
                    var hostEditor = EditorManager.getCurrentFullEditor();
                    var inlineWidget = hostEditor.getInlineWidgets()[0];
                    EditorManager.closeInlineWidget(hostEditor, inlineWidget);
                    
                    // Now there are no parts of Brackets that need to keep the CSS Document alive (its only ref is its own master
                    // Editor and that Editor isn't accessible in the UI anywhere). It's ready to get "GCed" by DocumentManager as
                    // soon as it hits a trigger point for doing so.
                    expect(DocumentManager.getOpenDocumentForPath(CSS_FILE)).toBeTruthy();
                    expect(cssDoc._refCount).toBe(1);
                    expect(cssDoc._masterEditor).toBeTruthy();
                    expect(testWindow.$(".CodeMirror").length).toBe(2);   // HTML editor (current) & CSS editor (dangling)
                    
                    // Switch to a third file - trigger point for cleanup
                    promise = CommandManager.execute(Commands.FILE_OPEN, {fullPath: JS_FILE});
                    waitsForDone(promise, "Switch to other file");
                });
                runs(function () {
                    // Creation of that third file's Document should have triggered cleanup of CSS Document and its master Editor
                    expect(DocumentManager.getOpenDocumentForPath(CSS_FILE)).toBeFalsy();
                    expect(cssDoc._refCount).toBe(0);
                    expect(cssDoc._masterEditor).toBeFalsy();
                    expect(testWindow.$(".CodeMirror").length).toBe(2);   // HTML editor (working set) & JS editor (current)
                });
            });
            
        });
    });
}