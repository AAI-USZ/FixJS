function findMatchingRules(selector, htmlDocument) {
        var result          = new $.Deferred(),
            cssFilesResult  = FileIndexManager.getFileInfoList("css"),
            resultSelectors = [];
        
        // Synchronously search for matches in <style> blocks
        if (htmlDocument) {
            _findMatchingRulesInStyleBlocks(htmlDocument, selector, resultSelectors);
        }
        
        // Asynchronously search for matches in all the project's CSS files
        // (results are appended together in same 'resultSelectors' array)
        _findMatchingRulesInCSSFiles(selector, resultSelectors)
            .done(function () {
                result.resolve(resultSelectors);
            })
            .fail(function (error) {
                result.reject(error);
            });
        
        return result.promise();
    }