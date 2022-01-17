function () {
                        extensionRequire = brackets.getModule('utils/ExtensionLoader').getRequireContextForExtension('JavaScriptQuickEdit');
                        JSUtilsInExtension = extensionRequire("JSUtils");
                        
                        FileViewController.openAndSelectDocument(testPath + "/edit.js", FileViewController.PROJECT_MANAGER)
                            .done(function () { didOpen = true; })
                            .fail(function () { gotError = true; });
                    }