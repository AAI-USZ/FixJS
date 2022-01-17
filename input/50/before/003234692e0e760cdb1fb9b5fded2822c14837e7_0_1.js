function (global) {
                    files[result.file].push({
                        severity: 'warning',
                        line: global.line,
                        column: 0,
                        message: "Implied global '" + global + "'",
                        source: 'jshint.implied-globals'
                    });
                }