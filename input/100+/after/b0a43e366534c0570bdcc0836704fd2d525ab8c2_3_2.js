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