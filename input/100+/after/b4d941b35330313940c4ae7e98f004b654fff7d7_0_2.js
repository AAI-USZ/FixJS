function (registry, options, callback) {
        var config = utils.simpleClone(options.config),
            queue = new gear.Queue({registry: registry})
                .read(this._files)
                .concat({
                    callback: function (blob) {
                        var filename = blob.name,
                            result = blob.result;

                        if (mime.lookup(filename) === 'text/html') {
                            //TODO: REFACTOR THIS!

                            var npm = filename.indexOf('node_modules') !== -1,
                                parts = npm ? filename.match(/.*\/?node_modules\/(.*)\/views.*\/(.*)\.(.*)\.html/) :
                                              filename.match(/.*\/?mojits\/(.*)\/views.*\/(.*)\.(.*)\.html/),
                                mojit = parts[1],
                                action = parts[2],
                                renderer = parts[3],
                                json = JSON.stringify(result);

                            result = 'YUI.add("views/' + mojit + '/' + action + '", function (Y, NAME) {\n';
                            result += '\tYUI.namespace("_mojito._cache.compiled.' + mojit + '.views");\n';
                            result += '\tYUI._mojito._cache.compiled.' + mojit + '.views.' + action + ' = ' + json + ';\n';
                            result += '});';
                        }

                        return result;
                    }
                });

        if (options.strip) {
            queue.replace(options.strip);
        }

        if (options.minify) {
            queue.jsminify();
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
                callback(null, result.url ? result.url : config.root + result.name);
            });
    }