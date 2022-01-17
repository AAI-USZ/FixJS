function doOpen(fullPath) {
        var result = new $.Deferred();

        if (!fullPath) {
            console.log("doOpen() called without fullPath");
            result.reject();
        } else {
            var perfTimerName = PerfUtils.markStart("Open File:\t" + fullPath);
            result.always(function () {
                PerfUtils.addMeasurement(perfTimerName);
            });
            
            // Load the file if it was never open before, and then switch to it in the UI
            DocumentManager.getDocumentForPath(fullPath)
                .done(function (doc) {
                    DocumentManager.setCurrentDocument(doc);
                    result.resolve(doc);
                })
                .fail(function (fileError) {
                    FileUtils.showFileOpenError(fileError.code, fullPath).done(function () {
                        // For performance, we do lazy checking of file existence, so it may be in working set
                        DocumentManager.removeFromWorkingSet(new NativeFileSystem.FileEntry(fullPath));
                        EditorManager.focusEditor();
                        result.reject();
                    });
                });
        }

        return result.promise();
    }