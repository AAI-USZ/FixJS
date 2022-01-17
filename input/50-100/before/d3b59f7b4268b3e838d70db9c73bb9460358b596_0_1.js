function (idx, toolId, file, fileOutput) {
            if (!_.isUndefined(processableTools[toolId + 1])) {
                processableTools[toolId + 1](idx, file, fileOutput);
            } else {
                compressedFileSizes[file] = String(fs.readFileSync(fileOutput)).length;
                processNextFile(idx, file);
            }
        }