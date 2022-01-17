function () {
                var deferred = new $.Deferred(),
                    entries = null;
                
                runs(function () {
                    NativeFileSystem.requestNativeFileSystem(this.path, function (data) {
                        entries = data;
                        deferred.resolve();
                    });
                    
                    waitsForDone(deferred);
                });

                runs(function () {
                    expect(entries).not.toBe(null);
                });
            }