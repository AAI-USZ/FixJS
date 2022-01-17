function(tools, files, dest, task, done) {
        var toolsToProcessInf = _.compact(_.map(tools, function (tool) {
                    if (tool.isAvailable === true) {
                        return tool;
                    }
                })),
            toolsToProcess = _.pluck(toolsToProcessInf, 'executable'),
            numberOfTools = toolsToProcess.length,
            numberOfFiles = files.length,
            processableFiles = [],
            processableTools = [],
            uncompressedFileSizes = {},
            compressedFileSizes = {},
            processFinished = null,
            processNextFile = null,
            processNextTool = null,
            checkMakeDir = null;


        // check if there are usable tools
        if (numberOfTools === 0) {
            grunt.helper('no tool installed', tools, task, done);
        }

        processFinished = function () {
            var overallSizeCompressed = 0,
                overallSizeUncompressed = 0;

            _.each(uncompressedFileSizes, function (uncompressedSize, file) {
                overallSizeCompressed += compressedFileSizes[file];
                overallSizeUncompressed += uncompressedSize;
            });

            grunt.log.ok('Compressed ' + files.length + ' files');
            grunt.log.ok('Uncompressed size: ' + (Math.round((overallSizeUncompressed / 1024) * 100) / 100) + 'kb, Compressed size: ' + (Math.round((overallSizeCompressed / 1024) * 100) / 100) + 'kb, Savings: ' + (Math.round((100 - (overallSizeCompressed / overallSizeUncompressed * 100)) * 100) / 100)  + '%');
            done();
        };

        processNextFile = function (idx, file) {
            if (!_.isUndefined(processableFiles[idx + 1])) {
                processableFiles[idx + 1]();
            } else {
                processFinished();
            }
        };

        processNextTool = function (idx, toolId, file, fileOutput) {
            if (!_.isUndefined(processableTools[toolId + 1])) {
                processableTools[toolId + 1](idx, file, fileOutput);
            } else {
                setTimeout(function() {
                    compressedFileSizes[file] = String(fs.readFileSync(fileOutput)).length;
                    processNextFile(idx, file);
                }, 20);
            }
        };

        // check if folder exists else create
        checkMakeDir = function (dir) {
            try {
                var stats = fs.lstatSync(dir);
                if (!stats.isDirectory()) {
                    mkdirp(dir);
                }
            } catch (e) {
                mkdirp(dir);
            }
        };

        // generat list of files to process
        files.forEach(function (file, idx) {
            var normalizedFile = path.normalize(file),
            
            fileOutput = path.normalize(dest + normalizedFile.substr(normalizedFile.indexOf('/'))),
            dir = path.dirname(fileOutput);

            fs.readFile(file, function (err, data) {
                uncompressedFileSizes[file] = String(data).length;
            });

            checkMakeDir(dir);

            processableFiles.push(function () {
                processNextTool(idx, -1, file, fileOutput);
            });
        });

        // build processable tool stack
        toolsToProcess.forEach(function (tool, toolId) {

            processableTools.push(function (idx, file, fileOutput) {
                var flags = _.map(toolsToProcessInf[toolId].flags, function (flag) {
                    var remappedFlags = '';

                    switch (flag) {
                        case '<inputFile>':
                            remappedFlags = (toolId !== 0 ? fileOutput : file);
                            break;
                        case '<outputFile>':
                            remappedFlags = fileOutput;
                            break;
                        case '<outputFolder>':
                            remappedFlags = path.dirname(fileOutput);
                            break;
                        default:
                            remappedFlags = flag;
                            break;
                    }
                return remappedFlags;
            });

            var ls = grunt.utils.spawn({
                    cmd: tool,
                    args: flags
                }, function (error, result, code) {
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
                });

            });
        });

        // kick off file processing
        if (files.length === 0) {
            grunt.log.ok('No matching files found!');
            done();
        } else {
            processNextFile(-1, files[-1]);
        }

  }