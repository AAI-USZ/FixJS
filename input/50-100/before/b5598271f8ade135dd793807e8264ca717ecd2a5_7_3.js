function requestNativeFileSystemSuccessCB(nfs) {
                    var reader = nfs.createReader();

                    var successCallback = function (e) { entries = e; readComplete = true; };
                    var errorCallback = function () { readComplete = true; gotError = true; };

                    reader.readEntries(successCallback, errorCallback);
                }