function (file, idx) {
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
        }