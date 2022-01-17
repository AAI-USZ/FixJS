function (file) {
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
                }