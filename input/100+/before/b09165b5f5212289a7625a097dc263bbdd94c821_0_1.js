function _scanDirectoryRecurse(dirEntry) {
            // skip invisible directories on mac
            if (brackets.platform === "mac" && dirEntry.name.charAt(0) === ".") {
                return;
            }

            state.dirInProgress[dirEntry.fullPath] = true;
            //console.log("started dir: " + dirEntry.fullPath);

            dirEntry.createReader().readEntries(
                // success callback
                function (entries) {
                    // inspect all children of dirEntry
                    entries.forEach(function (entry) {
                        // For now limit the number of files that are indexed by preventing adding files
                        // or scanning additional directories once a max has been hit. Also notify the 
                        // user once via a dialog. This limit could be increased
                        // if files were indexed in a worker thread so scanning didn't block the UI
                        if (state.fileCount > 10000) {
                            if (!state.maxFilesHit) {
                                state.maxFilesHit = true;
                                _showMaxFilesDialog();
                            }
                            return;
                        }

                        if (entry.isFile) {
                            _addFileToIndexes(entry);
                            state.fileCount++;

                        } else if (entry.isDirectory) {
                            _scanDirectoryRecurse(entry);
                        }
                    });

                    _finishDirScan(dirEntry);
                },
                // error callback
                function (error) {
                    state.dirError[dirEntry.fullPath] = error;
                    _finishDirScan(dirEntry);
                }
            );
        }