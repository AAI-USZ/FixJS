function (idx, file, fileOutput) {
            if (compressedFileSizes[file] > uncompressedFileSizes[file]) {
                compressedFileSizes[file] = uncompressedFileSizes[file];
                fs.writeFileSync(fileOutput, currentFilesInProcess[file]);
            }


            if (!_.isUndefined(processableFiles[idx + 1])) {
                processableFiles[idx + 1]();
            } else {
                processFinished();
            }
        }