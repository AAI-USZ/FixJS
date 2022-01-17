function () {
                var statCalled = false, readComplete = false, gotError = false, theError = null;
                var oldStat = brackets.fs.stat;
                this.after(function () { brackets.fs.stat = oldStat; });
                
                function requestNativeFileSystemSuccessCB(nfs) {
                    var reader = nfs.createReader();
                    
                    var successCallback = function (e) { readComplete = true; };
                    var errorCallback = function (error) { readComplete = true; gotError = true; theError = error; };

                    // mock up new low-level stat that never calls the callback
                    brackets.fs.stat = function (path, callback) {
                        statCalled = true;
                    };
                    
                    reader.readEntries(successCallback, errorCallback);
                    
                }
                
                var nfs = NativeFileSystem.requestNativeFileSystem(this.path, requestNativeFileSystemSuccessCB);

                waitsFor(function () { return readComplete; }, NativeFileSystem.ASYNC_TIMEOUT * 2);
                    
                runs(function () {
                    expect(readComplete).toBe(true);
                    expect(statCalled).toBe(true);
                    expect(gotError).toBe(true);
                    expect(theError.code).toBe(FileError.SECURITY_ERR);
                });
            }