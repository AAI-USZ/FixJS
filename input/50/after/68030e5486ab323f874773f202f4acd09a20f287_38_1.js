function () {
                    extensionRequire = testWindow.brackets.getModule("utils/ExtensionLoader").getRequireContextForExtension("JavaScriptQuickEdit");
                    JavaScriptQuickEdit = extensionRequire("main");
                    
                    waitsForDone(SpecRunnerUtils.openProjectFiles(["ui/jquery.effects.core.js"]), "openProjectFiles");
                }