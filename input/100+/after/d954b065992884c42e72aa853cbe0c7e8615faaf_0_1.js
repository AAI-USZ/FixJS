function (blob) {
                        var filename = blob.name,
                            result = blob.result;

                            console.log(blob);

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