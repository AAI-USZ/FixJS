function () {
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
                    }