function () {
                var deferred = new $.Deferred(),
                    error;
                
                runs(function () {
                    NativeFileSystem.requestNativeFileSystem(this.path + '/nonexistent-dir', function (data) {
                        deferred.resolve();
                    }, function (err) {
                        error = err;
                        deferred.reject();
                    });
                    
                    waitsForFail(deferred, "requestNativeFileSystem");
                });

                runs(function () {
                    expect(error.code).toBe(FileError.NOT_FOUND_ERR);
                });
            }