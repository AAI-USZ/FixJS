function () {
                var deferred = new $.Deferred(),
                    error;
                
                runs(function () {
                    NativeFileSystem.requestNativeFileSystem(
                        0xDEADBEEF,
                        function (data) {
                            deferred.resolve();
                        },
                        function (err) {
                            error = err;
                            deferred.reject();
                        }
                    );
                    
                    waitsForFail(deferred);
                });

                runs(function () {
                    expect(error.code).toBe(FileError.SECURITY_ERR);
                });
            }