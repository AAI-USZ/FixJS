function (writer) {
                            writer.onerror = function (e) {
                                console.log("Could not properly write " + fileName);
                                //pass
                            };

                            var bb = new window.WebKitBlobBuilder();
                            bb.append(xhr.response);
                            writer.write(bb.getBlob(utils.fileNameToMIME(fileName)));

                            // Call the callback sending back the filepath to the image so the Viewer can be invoked
                            callback(target + fileEntry.name);
                        }