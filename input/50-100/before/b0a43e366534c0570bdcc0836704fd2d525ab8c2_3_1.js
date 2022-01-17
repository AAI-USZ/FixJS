function () {
                        FileViewController.openAndSelectDocument(testPath + "/edit.js", FileViewController.PROJECT_MANAGER)
                            .done(function () { didOpen = true; })
                            .fail(function () { gotError = true; });
                    }