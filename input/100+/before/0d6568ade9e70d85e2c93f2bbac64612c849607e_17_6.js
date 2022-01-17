function () {
                var gotFile = false, readFile = false, errorCode;
                var fileEntry = new NativeFileSystem.FileEntry(this.path + "/idontexist");
                fileEntry.file(function (file) {
                    gotFile = true;
                    var reader = new NativeFileSystem.FileReader();
                    reader.onload = function (event) {
                        readFile = true;
                    };
                    reader.onerror = function (event) {
                        errorCode = event.target.error.code;
                    };
                    reader.readAsText(file, Encodings.UTF8);
                });

                waitsFor(function () { return gotFile && errorCode; }, 1000);

                runs(function () {
                    expect(gotFile).toBe(true);
                    expect(readFile).toBe(false);
                    expect(errorCode).toBe(FileError.NOT_FOUND_ERR);
                });
            }