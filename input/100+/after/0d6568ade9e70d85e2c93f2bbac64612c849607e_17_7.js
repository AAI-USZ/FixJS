function () {
                var gotFile = false, gotLoad = false, gotLoadStart = false, gotLoadEnd = false,
                    gotProgress = false, gotError = false, gotAbort = false;
                
                runs(function () {
                    var fileEntry = new NativeFileSystem.FileEntry(this.path + "/file1");
                    fileEntry.file(function (file) {
                        gotFile = true;
                        var reader = new NativeFileSystem.FileReader();
                        reader.onload = function (event) {
                            gotLoad = true;
                        };
                        reader.onloadstart = function (event) {
                            gotLoadStart = true;
                        };
                        reader.onloadend = function (event) {
                            gotLoadEnd = true;
                        };
                        reader.onprogress = function (event) {
                            gotProgress = true;
                        };
                        reader.onerror = function (event) {
                            gotError = true;
                        };
                        reader.onabort = function (event) {
                            gotAbort = true;
                        };
                        reader.readAsText(file, Encodings.UTF8);
                    });
                });

                waitsFor(function () { return gotLoad && gotLoadEnd && gotProgress; }, 1000);

                runs(function () {
                    expect(gotFile).toBe(true);
                    expect(gotLoadStart).toBe(true);
                    expect(gotLoad).toBe(true);
                    expect(gotLoadEnd).toBe(true);
                    expect(gotProgress).toBe(true);
                    expect(gotError).toBe(false);
                    expect(gotAbort).toBe(false);
                });
            }