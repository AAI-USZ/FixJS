function () {
                var testPath = extensionPath + "/unittest-files",
                    brackets;
        
                beforeEach(function () {
                    SpecRunnerUtils.createTestWindowAndRun(this, function (testWindow) {
                        // Load module instances from brackets.test
                        brackets            = testWindow.brackets;
                        DocumentManager     = brackets.test.DocumentManager;
                        FileIndexManager    = brackets.test.FileIndexManager;
                        FileViewController  = brackets.test.FileViewController;

                        SpecRunnerUtils.loadProjectInTestWindow(testPath);
                    });
                });
    
                afterEach(function () {
                    SpecRunnerUtils.closeTestWindow();
                });
                
                function fileChangedTest(buildCache) {
                    var doc,
                        didOpen = false,
                        gotError = false,
                        extensionRequire,
                        JSUtilsInExtension,
                        functions = null;

                    runs(function () {
                        extensionRequire = brackets.getModule('utils/ExtensionLoader').getRequireContextForExtension('JavaScriptQuickEdit');
                        JSUtilsInExtension = extensionRequire("JSUtils");
                        
                        FileViewController.openAndSelectDocument(testPath + "/edit.js", FileViewController.PROJECT_MANAGER)
                            .done(function () { didOpen = true; })
                            .fail(function () { gotError = true; });
                    });
                    
                    waitsFor(function () { return didOpen && !gotError; }, "FileViewController.addToWorkingSetAndSelect() timeout", 1000);
                    
                    // Populate JSUtils cache
                    if (buildCache) {
                        runs(function () {
                            FileIndexManager.getFileInfoList("all")
                                .done(function (fileInfos) {
                                    // Look for "edit2" function
                                    JSUtilsInExtension.findMatchingFunctions("edit2", fileInfos)
                                        .done(function (result) { functions = result; });
                                });
                        });
                        
                        waitsFor(function () { return functions !== null; }, "JSUtils.findMatchingFunctions() timeout", 1000);
                        
                        runs(function () {
                            expect(functions.length).toBe(1);
                            expect(functions[0].lineStart).toBe(7);
                            expect(functions[0].lineEnd).toBe(9);
                        });
                    }
                    
                    runs(function () {
                        var doc = DocumentManager.getCurrentDocument();
                        
                        // Add several blank lines at the beginning of the text
                        doc.setText("\n\n\n\n" + doc.getText());

                        FileIndexManager.getFileInfoList("all")
                            .done(function (fileInfos) {
                                // JSUtils cache should update with new offsets
                                functions = null;
                                
                                // Look for "edit2" function
                                JSUtilsInExtension.findMatchingFunctions("edit2", fileInfos)
                                    .done(function (result) { functions = result; });
                            });
                    });
                    
                    waitsFor(function () { return functions !== null; }, "JSUtils.findMatchingFunctions() timeout", 1000);
                    
                    runs(function () {
                        expect(functions.length).toBe(1);
                        expect(functions[0].lineStart).toBe(11);
                        expect(functions[0].lineEnd).toBe(13);
                    });
                }
                
                it("should return the correct offsets if the file has changed", function () {
                    fileChangedTest(false);
                });
                
                it("should return the correct offsets if the results were cached and the file has changed", function () {
                    fileChangedTest(true);
                });
                
                function insertFunctionTest(buildCache) {
                    var didOpen = false,
                        gotError = false,
                        extensionRequire,
                        JSUtilsInExtension,
                        functions = null;
                    
                    runs(function () {
                        extensionRequire = brackets.getModule('utils/ExtensionLoader').getRequireContextForExtension('JavaScriptQuickEdit');
                        JSUtilsInExtension = extensionRequire("JSUtils");
                        
                        FileViewController.openAndSelectDocument(testPath + "/edit.js", FileViewController.PROJECT_MANAGER)
                            .done(function () { didOpen = true; })
                            .fail(function () { gotError = true; });
                    });
                    
                    waitsFor(function () { return didOpen && !gotError; }, "FileViewController.addToWorkingSetAndSelect() timeout", 1000);
                    
                    // Populate JSUtils cache
                    if (buildCache) {
                        runs(function () {
                            // Look for the selector we're about to create--we shouldn't find it yet
                            FileIndexManager.getFileInfoList("all")
                                .done(function (fileInfos) {
                                    // Look for "TESTFUNCTION" function
                                    JSUtilsInExtension.findMatchingFunctions("TESTFUNCTION", fileInfos)
                                        .done(function (result) {
                                            functions = result;
                                        });
                                });
                        });
                        
                        waitsFor(function () { return functions !== null; }, "JSUtils.findMatchingFunctions() timeout", 1000);
                        
                        runs(function () {
                            expect(functions.length).toBe(0);
                        });
                    }
                    
                    runs(function () {
                        // reset result functions array
                        functions = null;
                        
                        var doc = DocumentManager.getCurrentDocument();
                        // Add a new function to the file
                        doc.setText(doc.getText() + "\n\nfunction TESTFUNCTION() {\n    return true;\n}\n");
                        
                        // Look for the selector we just created
                        FileIndexManager.getFileInfoList("all")
                            .done(function (fileInfos) {
                                var extensionRequire = brackets.getModule('utils/ExtensionLoader').getRequireContextForExtension('JavaScriptQuickEdit');
                                var JSUtilsInExtension = extensionRequire("JSUtils");

                                // Look for "TESTFUNCTION" function
                                JSUtilsInExtension.findMatchingFunctions("TESTFUNCTION", fileInfos)
                                    .done(function (result) {
                                        functions = result;
                                    });
                            });
                    });
                    
                    waitsFor(function () { return functions !== null; }, "JSUtils.findMatchingFunctions() timeout", 1000);
                    
                    runs(function () {
                        expect(functions.length).toBe(1);
                        expect(functions[0].lineStart).toBe(33);
                        expect(functions[0].lineEnd).toBe(35);
                    });
                }

                it("should return a newly created function in an unsaved file", function () {
                    insertFunctionTest(false);
                });

                it("should return a newly created function in an unsaved file that already has cached results", function () {
                    insertFunctionTest(true);
                });
            }