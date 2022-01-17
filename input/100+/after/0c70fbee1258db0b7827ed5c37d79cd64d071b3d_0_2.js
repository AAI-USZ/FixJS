function handleUpload(dataSocket) {
                    var erroredOut = false;
                    dataSocket.on('data', dataHandler);
                    var slurpBuf;
                    if (self.uploadMaxSlurpSize > 0) {
                        logIf(0, "Allocating slurp buffer for upload");
                        slurpBuf = new Buffer(1024);
                    }
                    var totalBytes = 0;
                    function dataHandler (buf) {
                        if (slurpBuf && totalBytes + buf.length <= self.uploadMaxSlurpSize) {
                            if (totalBytes + buf.length > slurpBuf.length) {
                                var newLength = slurpBuf.length * 2;
                                if (newLength > self.uploadMaxSlurpSize)
                                    newLength = self.uploadMaxSlurpSize;
                                if (newLength < totalBytes + buf.length)
                                    newLength = totalBytes + buf.length;

                                var newSlurpBuf = new Buffer(newLength);
                                slurpBuf.copy(newSlurpBuf, 0, 0, totalBytes);
                                slurpBuf = newSlurpBuf;
                            }
                            buf.copy(slurpBuf, totalBytes, 0, buf.length);
                            totalBytes += buf.length;
                        }
                        else {
                            if (totalBytes > 0) {
                                writeBuf(slurpBuf, totalBytes);
                                slurpBuf = null;
                            }
                            writeBuf(buf, buf.length);

                            var writeError = false;
                            function writeBuf(wbuf, upto) {
                                if (writeError) return;

                                conn.fs.write(fd, buf, 0, upto, null, function (err) {
                                    if (err) {
                                        writeError = true;
                                        dataSocket.removeListener('data', dataHandler);
                                        conn.fs.close(fd, function (err) {
                                            logIf(0, "Error closing file following write error", err);
                                        });
                                        socket.write("426 Connection closed; transfer aborted\r\n");
                                    }
                                });
                            }
                        }
                    }
                    dataSocket.once('error', function (buf) {
                        erroredOut = true;
                        conn.fs.close(fd, function (err) {
                            if (err) {
                                dataSocket.removeListener('data', dataHandler);
                                logIf(0, "Error closing file following error on dataSocket", err);
                                socket.write("426 Connection closed; transfer aborted\r\n");
                            }
                        });
                    });
                    dataSocket.once('end', function (buf) {
                        if (erroredOut)
                            return;

                        dataSocket.removeListener('data', dataHandler);
                        
                        // If we kept it all in the slurp buffer, finally write it out.
                        if (slurpBuf) {
                            logIf(0, "Writing out file from slurp buffer");
                            conn.fs.write(fd, slurpBuf, 0, totalBytes, null, function (err) {
                                if (err) {
                                    logIf(0, "Error writing slurp buffer to file following 'end' message", err);
                                    socket.write("426 Connection closed; transfer aborted\r\n");
                                    return;
                                }
                                
                                onceOnDisk();
                            });
                        }
                        else {
                            onceOnDisk();
                        }
                        
                        function onceOnDisk() {
                            conn.fs.close(fd, function (err) {
                                if (err) {
                                    logIf(0, "Error closing file following 'end' message", err);
                                    socket.write("426 Connection closed; transfer aborted\r\n");
                                    return;
                                }
                                
                                socket.write("226 Closing data connection\r\n");
                            });
                        }
                    });
                }