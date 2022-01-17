function (args, callback) {

            var directory   = window.qnx.webplatform.getApplication().getEnv("HOME"),
                target      = directory + "/../shared/" + args[1] + "/",
                source      = args[0],
                fileName    = args[0].replace(/^.*[\\\/]/, ''),
                xhr;

            window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

            if (utils.startsWith(source, "local:///")) {
                source = "file:/" + directory + "/../app/native/" + fileName;
            }
            debugger;
            xhr = new XMLHttpRequest();
            xhr.open('GET', source, true);
            xhr.responseType = 'arraybuffer';

            function onError(error)
            {
                console.log(error);
                //pass
            }

            xhr.onload = function (e) {
                window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function (fileSystem) {
                    fileSystem.root.getFile(target + fileName, {create: true}, function (fileEntry) {
                        fileEntry.createWriter(function (writer) {
                            writer.onerror = function (e) {
                                console.log("could not write the image");
                                //pass
                            };

                            var bb = new window.WebKitBlobBuilder();
                            bb.append(xhr.response);
                            writer.write(bb.getBlob(utils.fileNameToMIME(fileName)));
                            callback(target + fileEntry.name);
                        }, onError);
                    }, onError);
                }, onError);
            };

            xhr.send();
        }