function () {
                var entries = null,
                    deferred = new $.Deferred();
                
                function requestNativeFileSystemSuccessCB(nfs) {
                    var reader = nfs.createReader();

                    var successCallback = function (e) { entries = e; deferred.resolve(); };
                    var errorCallback = function () { deferred.reject(); };

                    reader.readEntries(successCallback, errorCallback);
                }
                
                runs(function () {
                    NativeFileSystem.requestNativeFileSystem(this.path, requestNativeFileSystemSuccessCB);
                    waitsForDone(deferred, "requestNativeFileSystem");
                });

                runs(function () {
                    expect(entries.some(function (element) {
                        return (element.isDirectory && element.name === "dir1");
                    })).toBe(true);

                    expect(entries.some(function (element) {
                        return (element.isFile && element.name === "file1");
                    })).toBe(true);

                    expect(entries.some(function (element) {
                        return (element.isFile && element.name === "file2");
                    })).toBe(false);
                });
            }