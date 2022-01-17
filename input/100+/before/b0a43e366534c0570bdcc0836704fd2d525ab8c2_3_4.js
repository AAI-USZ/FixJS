function () {
            
            this.performance = true;
            
            var testPath = SpecRunnerUtils.getTestPath("/../../../brackets-scenario/jquery-ui/");

            beforeEach(function () {
                SpecRunnerUtils.createTestWindowAndRun(this, function (w) {
                    testWindow = w;
                    CommandManager      = testWindow.brackets.test.CommandManager;
                    EditorManager       = testWindow.brackets.test.EditorManager;
                    PerfUtils           = testWindow.brackets.test.PerfUtils;
                });
            });
    
            afterEach(function () {
                SpecRunnerUtils.closeTestWindow();
            });
            
            it("should open inline editors", function () {
                SpecRunnerUtils.loadProjectInTestWindow(testPath);
                
                var extensionRequire,
                    JavaScriptQuickEdit,
                    done = false,
                    error = false,
                    i,
                    perfMeasurements = [
                        {
                            measure: PerfUtils.JAVASCRIPT_INLINE_CREATE,
                            children: [
                                {
                                    measure: PerfUtils.FILE_INDEX_MANAGER_SYNC
                                },
                                {
                                    measure: PerfUtils.JAVASCRIPT_FIND_FUNCTION,
                                    children: [
                                        {
                                            measure: PerfUtils.JSUTILS_GET_ALL_FUNCTIONS,
                                            children: [
                                                {
                                                    measure: PerfUtils.DOCUMENT_MANAGER_GET_DOCUMENT_FOR_PATH,
                                                    name: "Document creation during this search",
                                                    operation: "sum"
                                                },
                                                {
                                                    measure: PerfUtils.JSUTILS_REGEXP,
                                                    operation: "sum"
                                                }
                                            ]
                                        },
                                        {
                                            measure: PerfUtils.JSUTILS_END_OFFSET,
                                            operation: "sum"
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                
                runs(function () {
                    extensionRequire = testWindow.brackets.getModule('utils/ExtensionLoader').getRequireContextForExtension('JavaScriptQuickEdit');
                    JavaScriptQuickEdit = extensionRequire("main");
                    
                    SpecRunnerUtils.openProjectFiles(["ui/jquery.effects.core.js"]).done(function () {
                        done = true;
                    }).fail(function () {
                        error = true;
                    });
                });
                
                waitsFor(function () { return done && !error; }, 500);
                
                var runCreateInlineEditor = function () {
                    done = error = false;
                    
                    JavaScriptQuickEdit._createInlineEditor(EditorManager.getCurrentFullEditor(), "extend").done(function () {
                        done = true;
                    }).fail(function () {
                        error = true;
                    });
                };
                
                var waitForInlineEditor = function () { return done && !error; };
                
                function logPerf() {
                    PerformanceReporter.logTestWindow(perfMeasurements);
                    PerformanceReporter.clearTestWindow();
                }
                
                // repeat 5 times
                for (i = 0; i < 5; i++) {
                    runs(runCreateInlineEditor);
                    waitsFor(waitForInlineEditor, 500);
                    runs(logPerf);
                }
            });
            
        }