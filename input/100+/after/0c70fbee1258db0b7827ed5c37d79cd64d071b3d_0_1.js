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