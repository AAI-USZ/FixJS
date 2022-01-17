function openFile(path) {
            var didOpen = false, gotError = false;
        
            runs(function () {
                CommandManager.execute(Commands.FILE_OPEN, {fullPath: testPath + path})
                    .done(function () {
                        didOpen = true;
                    })
                    .fail(function () { gotError = true; });
            });
            waitsFor(function () { return didOpen && !gotError; }, 1000);
            
            runs(function () {
                PerformanceReporter.logTestWindow(PerfUtils.OPEN_FILE, path);
                PerformanceReporter.clearTestWindow();
            });
        }