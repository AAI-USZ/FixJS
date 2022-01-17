function (registry, options, callback) {
        var config = utils.simpleClone(options.config),
            queue = new gear.Queue({registry: registry})
                .read(this._files)
                .concat()
                .replace({
                    regex: "^[ ]+(?:this\\.Y\\.log|Y\\.log|console\\.log).*?(?:;|\\).*;|(?:\r?\n.*?)*?\\).*;).*;?.*?\r?\n",
                    replace: '',
                    flags: 'mg'
                });

        if (options.minify) {
            queue.task(mime.lookup(this._name) === 'application/javascript' ? 'jsminify' : 'cssminify');
        }

        config.name = this._name;
        queue.task(options.task, config)
            .run(function(err, results) {
                if (err) {
                    logger.error('[SHAKER] - Failed to build file ' + config.name + ' (' + err + ')');
                    callback(err);
                    return;
                }
                var result = results[0];
                callback(null, result.url ? result.url : config.root + result.name, result.skipped);
            });
    }