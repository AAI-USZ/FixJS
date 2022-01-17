function getDocumentForPath(fullPath) {
        var doc             = _openDocuments[fullPath],
            pendingPromise  = getDocumentForPath._pendingDocumentPromises[fullPath];

        if (doc) {
            // use existing document
            return new $.Deferred().resolve(doc).promise();
        } else if (pendingPromise) {
            // wait for the result of a previous request
            return pendingPromise;
        } else {
            var result = new $.Deferred(),
                promise = result.promise();
            
            // log this document's Promise as pending
            getDocumentForPath._pendingDocumentPromises[fullPath] = promise;

            // create a new document
            var fileEntry = new NativeFileSystem.FileEntry(fullPath),
                perfTimerName = PerfUtils.markStart("getDocumentForPath:\t" + fullPath);

            result.done(function () {
                PerfUtils.addMeasurement(perfTimerName);
            }).fail(function () {
                PerfUtils.finalizeMeasurement(perfTimerName);
            });

            FileUtils.readAsText(fileEntry)
                .always(function () {
                    // document is no longer pending
                    delete getDocumentForPath._pendingDocumentPromises[fullPath];
                })
                .done(function (rawText, readTimestamp) {
                    doc = new Document(fileEntry, readTimestamp, rawText);
                    result.resolve(doc);
                })
                .fail(function (fileError) {
                    result.reject(fileError);
                });
            
            return promise;
        }
    }