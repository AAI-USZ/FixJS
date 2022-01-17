function findMatchingFunctions(functionName) {
        var result          = new $.Deferred(),
            resultFunctions = [],
            jsFilesResult   = FileIndexManager.getFileInfoList("all");
        
        // Load index of all CSS files; then process each CSS file in turn (see above)
        jsFilesResult.done(function (fileInfos) {
            Async.doInParallel(fileInfos, function (fileInfo, number) {
                return _getMatchingFunctionsInFile(fileInfo, functionName, resultFunctions);
            })
                .done(function () {
                    result.resolve(resultFunctions);
                })
                .fail(function (error) {
                    result.reject(error);
                });
        });
        
        return result.promise();
    }