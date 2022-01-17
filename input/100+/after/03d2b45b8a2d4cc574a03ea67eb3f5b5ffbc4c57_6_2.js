function () {
        
        this.category = "performance";
        
        // Note: this tests assumes that the "brackets-scenario" repo is in the same folder
        //       as the "brackets-app"
        //
        // TODO: these tests rely on real world example files that cannot be on open source. 
        // We should replace these with test files that can be in the public repro.
        var testPath = SpecRunnerUtils.getTestPath("/../../../brackets-scenario/OpenFileTest/"),
            testWindow;
        
        function openFile(path) {
            var fullPath = testPath + path;
            runs(function () {
                var promise = CommandManager.execute(Commands.FILE_OPEN, {fullPath: fullPath});
                waitsForDone(promise);
            });
            
            runs(function () {
                PerformanceReporter.logTestWindow(/Open File:\t,*/, path);
                PerformanceReporter.clearTestWindow();
            });
        }
        
        beforeEach(function () {
            SpecRunnerUtils.createTestWindowAndRun(this, function (w) {
                testWindow = w;
        
                // Load module instances from brackets.test
                CommandManager      = testWindow.brackets.test.CommandManager;
                Commands            = testWindow.brackets.test.Commands;
                DocumentCommandHandlers = testWindow.brackets.test.DocumentCommandHandlers;
                DocumentManager     = testWindow.brackets.test.DocumentManager;
                PerfUtils           = testWindow.brackets.test.PerfUtils;
                JSLintUtils         = testWindow.brackets.test.JSLintUtils;
        
                jsLintPrevSetting = JSLintUtils.getEnabled();
                JSLintUtils.setEnabled(false);
            });
        });
        
        afterEach(function () {
            SpecRunnerUtils.closeTestWindow();
        });
        
        
        // TODO: right now these are in a single test because performance results are
        // tied to a window, so we need one window for all the tests. Need to think
        // more about how performance tests should ultimately work.
        it("File open performance", function () {
            openFile("all-classes.js");
            openFile("jquery_ui_index.html");
            openFile("blank.js");
            openFile("example-data.js");
            openFile("sink.css");
            openFile("England(Chinese).htm");
            openFile("jquery.mobile-1.1.0.css");
            openFile("jquery.mobile-1.1.0.min.css");
            openFile("jquery.mobile-1.1.0.js");
            openFile("jquery.mobile-1.1.0.min.js");
        });
    }