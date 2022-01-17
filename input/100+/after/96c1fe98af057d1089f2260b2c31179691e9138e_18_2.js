function findMatchingFunctions(functionName, fileInfos) {
        var result          = new $.Deferred(),
            resultFunctions = [];
        
        // Process each JS file in turn (see above)
        Async.doInParallel(fileInfos, function (fileInfo, number) {
            return _getMatchingFunctionsInFile(fileInfo, functionName, resultFunctions);
        })
            .done(function () {
                result.resolve(resultFunctions);
            })
            .fail(function (error) {
                result.reject(error);
            });
        
        return result.promise();
    }