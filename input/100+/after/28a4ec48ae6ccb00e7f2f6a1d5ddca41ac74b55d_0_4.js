function () {
                // TODO: (issue #241): Implement DirectoryEntry.getDirectory() and remove this empty folder workaround.
                // We need an empty folder for testing in this spec. Unfortunately, it's impossible
                // to check an empty folder in to git, and we don't have low level fs calls to create an emtpy folder.
                // So, for now, we have a folder called "emptydir" which contains a single 0-length file called
                // "placeholder". We delete that file at the beginning of each test, and then recreate it at the end.
                //
                // If we add NativeFileSystem commands to create a folder, we should change this test to simply create
                // a new folder (rather than remove a placeholder, etc.)
                var deferred = new $.Deferred(),
                    entries = null,
                    accessedFolder = false,
                    placeholderDeleted = false,
                    gotErrorReadingContents = false,
                    placeholderRecreated = false,
                    dirPath = this.path + "/emptydir",
                    placeholderPath = dirPath + "/placeholder";
                
                function requestNativeFileSystemSuccessCB(nfs) {
                    accessedFolder = true;
                
                    function recreatePlaceholder(successCallback) {
                        nfs.getFile("placeholder",
                                    { create: true, exclusive: true },
                                    function () { placeholderRecreated = true; },
                                    function () { placeholderRecreated = false; });
                    }

                    function readDirectory() {
                        var reader = nfs.createReader();
                        var successCallback = function (e) {
                            entries = e;
                            recreatePlaceholder();
                            deferred.resolve();
                        };
                        var errorCallback = function () {
                            gotErrorReadingContents = true;
                            recreatePlaceholder();
                            deferred.reject();
                        };
                        reader.readEntries(successCallback, errorCallback);
                    }

                    
                    function deletePlaceholder(successCallback) {
                        // TODO: (issue #241): implement FileEntry.remove()
                        // once NativeFileSystem has a delete/unlink, should use that
                        brackets.fs.unlink(placeholderPath, function (err) {
                            if (!err) {
                                placeholderDeleted = true;
                            }
                            // Even if there was an error, we want to read the directory
                            // because it could be that the placeholder is just missing.
                            // If we continue, we'll create the placeholder and the test
                            // will (maybe) pass next time
                            readDirectory();
                        });
                    }
                    
                    deletePlaceholder(); // which calls readDirectory which calls recreatePlaceholder
                            
                }
                
                runs(function () {
                    NativeFileSystem.requestNativeFileSystem(
                        dirPath,
                        requestNativeFileSystemSuccessCB,
                        function () { deferred.reject(); }
                    );
                    
                    waitsForDone(deferred, "requestNativeFileSystem");
                });

                runs(function () {
                    expect(accessedFolder).toBe(true);
                    expect(placeholderDeleted).toBe(true);
                    expect(gotErrorReadingContents).toBe(false);
                    expect(entries).toEqual([]);
                    expect(placeholderRecreated).toBe(true);
                });
            }