function handleUpload(dataSocket) {
        var erroredOut = false;
        self.dataSocket.on('data', dataHandler);
        var slurpBuf;
        if (self.server.uploadMaxSlurpSize > 0) {
            self._logIf(0, "Allocating slurp buffer for upload");
            slurpBuf = new Buffer(1024);
        }
        var totalBytes = 0;
        function dataHandler (buf) {
            if (slurpBuf && totalBytes + buf.length <= self.server.uploadMaxSlurpSize) {
                if (totalBytes + buf.length > slurpBuf.length) {
                    var newLength = slurpBuf.length * 2;
                    if (newLength > self.server.uploadMaxSlurpSize)
                        newLength = self.server.uploadMaxSlurpSize;
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

                    self.fs.write(fd, buf, 0, upto, null, function (err) {
                        if (err) {
                            writeError = true;
                            self.dataSocket.removeListener('data', dataHandler);
                            self.fs.close(fd, function (err) {
                                self._logIf(0, "Error closing file following write error", err);
                            });
                            wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                        }
                    });
                }
            }
        }
        self.dataSocket.once('error', function (buf) {
            erroredOut = true;
            self.fs.close(fd, function (err) {
                if (err) {
                    self.dataSocket.removeListener('data', dataHandler);
                    self._logIf(0, "Error closing file following error on dataSocket", err);
                    wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                }
            });
        });
        self.dataSocket.once('end', function (buf) {
            if (erroredOut)
                return;

            self.dataSocket.removeListener('data', dataHandler);
            
            // If we kept it all in the slurp buffer, finally write it out.
            if (slurpBuf) {
                self._logIf(0, "Writing out file from slurp buffer");
                self.fs.write(fd, slurpBuf, 0, totalBytes, null, function (err) {
                    if (err) {
                        self._logIf(0, "Error writing slurp buffer to file following 'end' message", err);
                        wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                        return;
                    }
                    
                    onceOnDisk();
                });
            }
            else {
                onceOnDisk();
            }
            
            function onceOnDisk() {
                self.fs.close(fd, function (err) {
                    if (err) {
                        self._logIf(0, "Error closing file following 'end' message", err);
                        wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                        return;
                    }
                    
                    wwenc(self.socket, "226 Closing data connection\r\n");
                });
            }
        });
    }