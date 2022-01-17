function (idx, attr) {
                    if (attr.nodeName.indexOf('data-configuration-') === 0) {
                        hasConfiguration = true;
                        var casing = element.attr('data-config-names');
                        var key = attr.nodeName.substring(19);
                        if (casing) {
                            var expression = new RegExp('\\b' + key + '\\b', 'gi');
                            var match = expression.exec(casing);
                            key = !!(match) ? match[0] : key;
                        }
                        configuration[key] = attr.nodeValue;
                    }
                }