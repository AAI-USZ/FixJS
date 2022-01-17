function(err, fd) {
                        if(err) {
                            traceIf(0, 'Error opening/creating file: ' + filename, socket);
                            socket.write("553 Could not create file\r\n");
                            dataSocket.end();
                            return;
                        }
                        logIf(3, "File opened/created: " + filename, socket);

                        dataSocket.addListener("end", function () {
                            var writtenToFile = 0;
                            var doneCallback = function() {
                                conn.fs.close(fd, function(err) {
                                    if (err) conn.emit('error', err);
                                    else socket.write("226 Closing data connection\r\n"); //, recv " + writtenToFile + " bytes\r\n");
                                });
																conn.emit("file:received", filename);
                            };
                            var writeCallback = function(err, written) {
                                var buf;
                                if (err) {
                                    traceIf(0, "Error writing " + filename + ": " + err, socket);
                                    return;
                                }
                                writtenToFile += written;
                                if (!dataSocket.buffers.length) {
                                    doneCallback();
                                    return;
                                }
                                buf = dataSocket.buffers.shift();
                                conn.fs.write(fd, buf, 0, buf.length, null, writeCallback);
                            };
                            writeCallback();
                        });
                        dataSocket.addListener("error", function(err) {
                            traceIf(0, "Error transferring " + filename + ": " + err, socket);
                            // close file handle
                            conn.fs.close(fd);
                        });
                        logIf(3, "Told client ok to send file data", socket);
                        socket.write("150 Ok to send data\r\n"); // don't think resume() needs to wait for this to succeed
                    }