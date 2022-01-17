function(err, files) {
        var generatedPaths = (files || [])
                                .filter(isExpected)
                                .map(path.join.bind(null, targetPath))
                                .map(function(filename) {
                                    return filename.replace(reExpected, '$1');
                                });
        
        debug('blitzing expected paths', generatedPaths);
        async.forEach(generatedPaths, rimraf, callback);
    }