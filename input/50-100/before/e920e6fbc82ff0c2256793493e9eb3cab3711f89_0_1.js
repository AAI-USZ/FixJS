function() {                                        // Copy Permissions from Parent Directory
                fs.chown(sFile, oStat.gid, oStat.uid, function() {                          // Copy Ownership from Parent Directory
                    fCallback(sFile);
                });
            }