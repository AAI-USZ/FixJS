function (unused) {
                    files[result.file].push({
                        severity: 'warning',
                        line: unused.line,
                        column: 0,
                        message: "Unused variable: '" + unused + "'",
                        source: 'jshint.implied-unuseds'
                    });
                }