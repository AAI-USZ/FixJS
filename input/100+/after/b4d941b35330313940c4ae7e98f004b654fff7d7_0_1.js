function (registry, options, callback) {
        var config = utils.simpleClone(options.config),
            queue = new gear.Queue({registry: registry})
                .read(this._files)
                .concat();

        if (options.strip) {
            queue.replace(options.strip);
        }
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