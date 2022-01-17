function(err, files) {
                // join the target path to the files
                files = 

                async.forEach(
                    (files || []).map(path.join.bind(null, targetPath)),
                    validateContents,
                    callback
                );
            }