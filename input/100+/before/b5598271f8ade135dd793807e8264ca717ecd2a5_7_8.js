function () {
                var gotFile = false, readFile = false, gotError = false;
                var fileEntry = new NativeFileSystem.FileEntry(null);
                fileEntry.file(function (file) {
                    gotFile = true;
                    var reader = new NativeFileSystem.FileReader();
                    reader.onload = function (event) {
                        readFile = true;
                    };
                    reader.onerror = function (event) {
                        gotError = true;
                    };
                    reader.readAsText(file, Encodings.UTF8);
                });

                waitsFor(function () { return gotError; }, 1000);

                runs(function () {
                    expect(gotFile).toBe(true);
                    expect(readFile).toBe(false);
                    expect(gotError).toBe(true);
                });
            }