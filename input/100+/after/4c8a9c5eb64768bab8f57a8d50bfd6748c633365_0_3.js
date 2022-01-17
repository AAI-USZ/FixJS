function(pasvconn) {
                    setSocketWriteEncoding(pasvconn, conn.mode);
                    var filename = PathModule.join(conn.root, commandArg);
                    if(filename != conn.filename)
                    {
                        conn.totsize = 0;
                        conn.filename = filename;
                    }

                    if (options.slurpFiles) {
                        conn.fs.readFile(conn.filename, function (err, contents) {
                            if (err) {
                                if (err.code == 'ENOENT') {
                                    socket.write("550 Not Found\r\n");
                                }
                                else { // Who knows what's going on here...
                                    socket.write("550 Not Accessible\r\n");
                                    traceIf(0, "Error at read other than ENOENT " + err, conn);
                                }
                            }
                            else {
                                // TODO: This conditional was in the original code. Seems like there should also be
                                // an 'else'. What do do here?
                                socket.write("150 Opening " + conn.mode.toUpperCase() + " mode data connection\r\n");
                                if (pasvconn.readyState == 'open') pasvconn.write(contents, conn.mode)
                                pasvconn.end();
                                socket.write("226 Closing data connection, sent " + conn.totsize + " bytes\r\n");
                            }
                        });
                    }
                    else {
                        conn.fs.open(conn.filename, "r", function (err, fd) {
                            logIf(0, "DATA file " + conn.filename + " opened", conn);
                            socket.write("150 Opening " + conn.mode.toUpperCase() + " mode data connection\r\n");
                            function readChunk() {
                                if (! self.buffer) self.buffer = new Buffer(4096);
                                conn.fs.read(fd, self.buffer, 0, 4096, null/*pos*/, function(err, bytesRead, buffer) {
                                    if(err) {
                                        traceIf(0, "Error reading chunk", conn);
                                        conn.emit("error", err);
                                        return;
                                    }
                                    if (bytesRead > 0) {
                                        conn.totsize += bytesRead;
                                        if(pasvconn.readyState == "open") pasvconn.write(self.buffer.slice(0, bytesRead), conn.mode);
                                        readChunk();
                                    }
                                    else {
                                        logIf(0, "DATA file " + conn.filename + " closed", conn);
                                        pasvconn.end();
                                        socket.write("226 Closing data connection, sent " + conn.totsize + " bytes\r\n");
                                        conn.fs.close(fd, function (err) {
                                            if (err) conn.emit("error", err);
                                            conn.totsize = 0;
                                        });
                                    }
                                });
                            }
                            if(err) {
                                if (err.code == 'ENOENT') {
                                    socket.write("550 Not Found\r\n");
                                }
                                else { // Who know's what's going on here...
                                    socket.write("550 Not Accessible\r\n");
                                    traceIf(0, "Error at read other than ENOENT " + err, conn);
                                }
                            }
                            else {
                                readChunk();
                            }
                        });
                    }
                }