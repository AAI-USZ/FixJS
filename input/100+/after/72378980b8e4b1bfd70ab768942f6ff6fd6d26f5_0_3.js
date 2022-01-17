function (file, idx) {
            var normalizedFile = path.normalize(file),
            
            fileOutput = path.normalize(dest + normalizedFile.substr(normalizedFile.indexOf('/'))),
            dir = path.dirname(fileOutput);

            currentFilesInProcess[file] = fs.readFileSync(file);
            uncompressedFileSizes[file] = String(currentFilesInProcess[file]).length;

            checkMakeDir(dir);
            processableFiles.push(function () {
                processNextTool(idx, -1, file, fileOutput);
            });
        }