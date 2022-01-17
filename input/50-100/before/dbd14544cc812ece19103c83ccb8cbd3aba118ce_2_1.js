f                    var alias = alias || 'value', key = key && key.substr(1);
                    var _iterate = 'i' + _counter++;
                    return '<% for(var ' + _iterate + ' in ' + _name + ') {' +
                                'if(' + _name + '.hasOwnProperty(' + _iterate + ')) {' +
                                    'var ' + alias + '=' + _name + '[' + _iterate + '];' +
                                    (key ? ('var ' + key + '=' + _iterate + ';') : '') +
                                '}' +
                        ' %>';
                })
