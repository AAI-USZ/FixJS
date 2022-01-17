function () {
                if (brackets.platform !== "mac") {
                    return;
                }
                
                var complete = false;
                var error = null;

                // createWriter() should return an error for files it can't read
                runs(function () {
                    this.nfs.getFile(
                        "cant_read_here.txt",
                        { create: false },
                        function (entry) {
                            entry.createWriter(
                                function () { complete = true; },
                                function (err) { error = err; }
                            );
                        }
                    );
                });
                waitsFor(function () { return complete || error; }, 1000);

                runs(function () {
                    expect(complete).toBeFalsy();
                    expect(error.code).toBe(FileError.NOT_READABLE_ERR);
                });
            }