function getDocumentForPath(fullPath) {
        var result  = new $.Deferred(),
            doc     = _openDocuments[fullPath];

        PerfUtils.markStart(PerfUtils.DOCUMENT_MANAGER_GET_DOCUMENT_FOR_PATH);
        result.done(function () {
            PerfUtils.addMeasurement(PerfUtils.DOCUMENT_MANAGER_GET_DOCUMENT_FOR_PATH);
        }).fail(function () {
            PerfUtils.finalizeMeasurement(PerfUtils.DOCUMENT_MANAGER_GET_DOCUMENT_FOR_PATH);
        });

        if (doc) {
            result.resolve(doc);
        } else {
            var fileEntry = new NativeFileSystem.FileEntry(fullPath);
            FileUtils.readAsText(fileEntry)
                .done(function (rawText, readTimestamp) {
                    doc = new Document(fileEntry, readTimestamp, rawText);
                    result.resolve(doc);
                })
                .fail(function (fileError) {
                    result.reject(fileError);
                });
        }
        
        return result.promise();
    }