function (error, result, code) {
                    var targetFileExists = null;
                    if (error !== null) {
                        try {
                            targetFileExists = fs.readFileSync(fileOutput) ? true : false;
                        } catch (e) {
                            targetFileExists = false;
                        }
                    }
                    if (error && !targetFileExists) {
                        grunt.file.copy(file, fileOutput);
                        processNextTool(idx, toolId, file, fileOutput);
                    } else {
                        if (tool === 'pngnq') {
                            grunt.file.copy(file.replace('.png', '') + '-nq8.png', fileOutput);
                            fs.unlinkSync(file.replace('.png', '') + '-nq8.png');
                            processNextTool(idx, toolId, file, fileOutput);
                        } else {
                            processNextTool(idx, toolId, file, fileOutput);
                        }
                    }
                }