function()
                            {
                                if (self.bundleLoader[1].platformLoaderSource) {

                                    return Q.when(self.bundleLoader[1].platformLoaderSource, function(platformCode) {

                                        return write([
                                            '    };',
                                            '    if (typeof sourcemint === "undefined") {',
                                            '        sourcemint = {};',
                                            '        var LOADER_INJECTED = {};',
                                            '        initLoader(LOADER_INJECTED);',
                                            '        (function(require, exports) {',
                                            '            ' + platformCode,
                                            '        })(require, sourcemint);',
                                            '        var platformRequire = require;',
                                            '        var isMain = ((platformRequire && platformRequire.main === module)?true:false);',
                                            '        require = LOADER_INJECTED.require;',
                                            '        sourcemint.sandbox(__dirname + "/' + ((self.bundleLoader[1].bundleUrlPrefix)?"/{host}"+self.bundleLoader[1].bundleUrlPrefix:"") + PATH.basename(self.path) + '", function(sandbox) {',
                                            '            if (typeof exports === "object") {',
                                        '                    var mainExports = sandbox.boot();',
                                        '                    for (var key in mainExports) {',
                                        '                        exports[key] = mainExports[key];',
                                        '                    }',
                                            '            } else {',
                                            '                sandbox.main();',
                                            '            }',
                                            '        }, {',
                                            '            rootBundleLoader: rootBundleLoader,',
                                            '            isMain: isMain',
                                            '        });',
                                            '    } else {',
                                            '        rootBundleLoader();',
                                            '    }',
                                            '})();',
                                        ].join('\n') + '\n');

                                    });

                                } else {
                                    return write([
                                        '    };',
                                        '    if (typeof sourcemint === "undefined") {',
                                        '        var exports = {};',
                                        '        initLoader(exports);',
                                        '        sourcemint = exports.require;',
                                        '        if (!require) require = sourcemint;',
                                        '        sourcemint.sandbox("./' + ((self.bundleLoader[1].bundleUrlPrefix)?"/{host}"+self.bundleLoader[1].bundleUrlPrefix:"") + PATH.basename(self.path) + '", function(sandbox) {',
                                        '            sandbox.main();',
                                        '        }, {',
                                        '            rootBundleLoader: rootBundleLoader',
                                        '        });',
                                        '    } else {                                        '        rootBundleLoader();',
                                        '    }',
                                        '})();'                  
                                    ].join('\n') + '\n');
                                }
                            });
