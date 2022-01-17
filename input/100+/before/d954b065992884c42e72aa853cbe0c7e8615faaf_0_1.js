function (blob) {
                        var filename = blob.name,
                            result = blob.result;

                        if (mime.lookup(filename) === 'text/html') {
                            var parts = filename.match(/.*\/?mojits\/(.*)\/views.*\/(.*)\.(.*)\.html/),
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