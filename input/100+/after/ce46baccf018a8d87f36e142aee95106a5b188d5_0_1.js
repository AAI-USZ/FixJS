function (callback) {
        var files = [],
            file,
            filtered = {},
            queue;

        for (file in this._core.getFiles()) {
            files.push(file);
        }
        
        filtered = this._filterFiles(files, true);

        if (filtered.css.length > 0) {
            new gear.Queue({registry: this._registry})
                .read(filtered.css)
                .csslint({callback: function(blob) {
                    var name = (blob.name ? blob.name : 'files...');
                    logger.log('[SHAKER] - Linting ' + name);
                    if (blob.csslint.length) {
                        logger.error(name + ' - ' + blob.csslint.length + ' CSSLint errors:');
                        blob.csslint.forEach(function(error) {
                            logger.error(error);
                        });
                        return '[SHAKER] - Aborting';
                    }
                }})
                .run(function(err, results) {
                    if (err) {
                        logger.error(err);
                    } else {
                        callback();
                    }
                });
        }
    }