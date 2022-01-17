function(err, stats) {
        if (err) return callback(err);
        
        if (stats.isDirectory()) {
            // read the contents of the directory
            fs.readdir(targetPath, function(err, files) {
                async.forEach(
                    (files || []).map(path.join.bind(null, targetPath)),
                    validateContents,
                    callback
                );
            });
        }
        else {
            // generate the name of it's test counterpart
            var testTargetFile = targetPath.replace(reExpected, '$1');
            
            async.map([testTargetFile, targetPath], fs.readFile, function(err, results) {
                assert.ifError(err, 'Cannot validate expected vs actual for: ' + targetPath);
                
                assert.equal(results[0].toString(), results[1].toString(), 'Actual does not match expected for : ' + targetPath);
                callback();
            });
        }
    }