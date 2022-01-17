function(err, files) {
                async.forEach(
                    (files || []).map(path.join.bind(null, targetPath)),
                    validateContents,
                    callback
                );
            }