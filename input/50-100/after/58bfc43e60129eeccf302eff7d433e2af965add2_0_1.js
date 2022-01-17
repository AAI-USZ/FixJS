function(err, fd_) {
                    fd = fd_;
                    if(err) {
                        traceIf(0, 'Error opening/creating file: ' + filename, socket);
                        socket.write("553 Could not create file\r\n");
                        dataSocket.end();
                        return;
                    }
                    logIf(3, "File opened/created: " + filename, socket);
                    logIf(3, "Told client ok to send file data", socket);

                    socket.write("150 Ok to send data\r\n", function () {
                        whenDataReady(handleUpload);
                    });
                }