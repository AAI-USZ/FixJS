function (writer) {
                            writer.onerror = function (e) {
                                console.log("could not write the image");
                                //pass
                            };

                            var bb = new window.WebKitBlobBuilder();
                            bb.append(xhr.response);
                            writer.write(bb.getBlob(utils.fileNameToMIME(fileName)));
                            callback(target + fileEntry.name);
                        }