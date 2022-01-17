function(oError, oStat) {
            if (oError) {
                console.error('Error', oError);
            } else {
                fs.chmod(sFile, oStat.mode, function() {                                        // Copy Permissions from Parent Directory
                    fs.chown(sFile, oStat.gid, oStat.uid, function() {                          // Copy Ownership from Parent Directory
                        fCallback(sFile);
                    });
                });
            }
        }