function() {
                    compressedFileSizes[file] = String(fs.readFileSync(fileOutput)).length;
                    processNextFile(idx, file);
                }