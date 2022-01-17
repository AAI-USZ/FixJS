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