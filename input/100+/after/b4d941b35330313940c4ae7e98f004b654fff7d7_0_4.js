function () {
                var options = {
                    task: self._task,
                    minify: self._minify,
                    strip: self._strip,
                    config: self._config
                };
                item.object.build(self._registry, options, function (err, url, skipped) {
                    if (err) {
                        // No way to kill queue so throw exception (async bug)
                        logger.error('[SHAKER] Stack trace:');
                        throw err;
                    }

                    if (!skipped) {
                        logger.log('[SHAKER] - Pushed file ' + url);
                    }
                    
                    item.files.push(url);
                    taskCallback();
                });
            }