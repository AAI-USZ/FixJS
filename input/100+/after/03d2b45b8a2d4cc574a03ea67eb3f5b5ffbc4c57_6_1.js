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