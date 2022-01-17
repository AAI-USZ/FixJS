function (result) {
            // Register the file
            result.file = result.file.replace(/^\.\//, '');
            if (!files[result.file]) {
                files[result.file] = [];
            }

            // Add the error
            files[result.file].push({
                severity: 'error',
                line: result.line,
                column: result.character,
                message: result.reason,
                source: result.raw
            });
        }