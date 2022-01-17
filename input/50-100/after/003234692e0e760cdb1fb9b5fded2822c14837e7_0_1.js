function (result) {
            // Register the file
            result.file = result.file.replace(/^\.\//, '');
            if (!files[result.file]) {
                files[result.file] = [];
            }

            // Add the error
            files[result.file].push({
                severity: 'error',
                line: result.error.line,
                column: result.error.character,
                message: result.error.reason,
                source: result.error.raw
            });
        }