function () {
                var deferred = new $.Deferred(),
                    errorCode;
                
                runs(function () {
                    var fileEntry = new NativeFileSystem.FileEntry(this.path + "/idontexist");
                    fileEntry.file(function (file) {
                        var reader = new NativeFileSystem.FileReader();
                        reader.onload = function (event) {
                            deferred.resolve();
                        };
                        reader.onerror = function (event) {
                            errorCode = event.target.error.code;
                            deferred.reject();
                        };
                        reader.readAsText(file, Encodings.UTF8);
                    });
                    
                    waitsForFail(deferred, "readAsText");
                });

                runs(function () {
                    expect(errorCode).toBe(FileError.NOT_FOUND_ERR);
                });
            }