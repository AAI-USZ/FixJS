f                    var _iterate = 'j' + _counter++;
                    return '<% for(var ' + _iterate + '=' + start + ';' + _iterate + '<' + end + ';' + _iterate + '++) {{' +
                                'var ' + _name + '=' + _iterate + ';' +
                        ' %>';
                });
