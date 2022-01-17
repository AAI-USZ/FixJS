function () {
                var successCalled = false, errorCalled = false, error = null;
                NativeFileSystem.requestNativeFileSystem(this.path + '/nonexistent-dir', function (data) {
                    successCalled = true;
                }, function (err) {
                    errorCalled = true;
                    error = err;
                });

                waitsFor(function () { return successCalled || errorCalled; }, 1000);

                runs(function () {
                    expect(successCalled).toBe(false);
                    expect(errorCalled).toBe(true);
                    expect(error.code).toBe(FileError.NOT_FOUND_ERR);
                });
            }