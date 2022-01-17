function () {
                    NativeFileSystem.requestNativeFileSystem(this.path, requestNativeFileSystemSuccessCB);
                    waitsForDone(deferred, "requestNativeFileSystem");
                }