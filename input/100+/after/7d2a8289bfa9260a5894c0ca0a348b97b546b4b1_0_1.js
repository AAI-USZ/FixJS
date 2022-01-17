function (entries) {
                        var i,
                            extensions = [];
                        
                        for (i = 0; i < entries.length; i++) {
                            if (entries[i].isDirectory) {
                                // FUTURE (JRB): read package.json instead of just using the entrypoint "main".
                                // Also, load sub-extensions defined in package.json.
                                extensions.push(entries[i].name);
                            }
                        }

                        if (extensions.length === 0) {
                            result.resolve();
                            return;
                        }
                        
                        Async.doInParallel(extensions, function (item) {
                            var extConfig = {
                                baseUrl: config.baseUrl + "/" + item,
                                paths: config.paths
                            };
                            return processExtension(item, extConfig, entryPoint);
                        }).always(function () {
                            // Always resolve the promise even when the extension entry point is missing
                            result.resolve();
                        });
                    }