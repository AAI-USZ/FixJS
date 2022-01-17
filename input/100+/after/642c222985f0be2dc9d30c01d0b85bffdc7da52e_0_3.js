function (commandArg) {
    var self = this;

    // Retrieve (download) a remote file.
    wwenc(self.socket, "150 Opening " + self.mode.toUpperCase() + " mode data connection\r\n", function () {
        self._whenDataReady( function(pasvconn) {
            var filename = PathModule.join(self.root, commandArg);
            if(filename != self.filename)
            {
                self.totsize = 0;
                self.filename = filename;
            }
            
            if (self.server.options.slurpFiles) {
                self.fs.readFile(self.filename, function (err, contents) {
                    if (err) {
                        if (err.code == 'ENOENT') {
                            wwenc(self.socket, "550 Not Found\r\n");
                        }
                        else { // Who knows what's going on here...
                            wwenc(self.socket, "550 Not Accessible\r\n");
                            self._traceIf(0, "Error at read other than ENOENT " + err, self);
                        }
                    }
                    else {
                        // TODO: This conditional was in the original code. Seems like there should also be
                        // an 'else'. What do do here?
                        if (pasvconn.readyState == 'open')
                            pasvconn.write(contents)
                        pasvconn.end();
                        wwenc(self.socket, "226 Closing data connection, sent " + self.totsize + " bytes\r\n");
                    }
                });
            }
            else {
                self.fs.open(self.filename, "r", function (err, fd) {
                    self._logIf(0, "DATA file " + self.filename + " opened", self);
                    function readChunk() {
                        if (! self.buffer) self.buffer = new Buffer(4096);
                        self.fs.read(fd, self.buffer, 0, 4096, null/*pos*/, function(err, bytesRead, buffer) {
                            if(err) {
                                self._traceIf(0, "Error reading chunk", self);
                                self.server.emit("error", err);
                                return;
                            }
                            if (bytesRead > 0) {
                                self.totsize += bytesRead;
                                if(pasvconn.readyState == "open") pasvconn.write(self.buffer.slice(0, bytesRead));
                                readChunk();
                            }
                            else {
                                self._logIf(0, "DATA file " + self.filename + " closed", self);
                                pasvconn.end();
                                wwenc(self.socket, "226 Closing data connection, sent " + self.totsize + " bytes\r\n");
                                self.fs.close(fd, function (err) {
                                    if (err) self.server.emit("error", err);
                                    self.totsize = 0;
                                });
                            }
                        });
                    }
                    if(err) {
                        if (err.code == 'ENOENT') {
                            wwenc(self.socket, "550 Not Found\r\n");
                        }
                        else { // Who know's what's going on here...
                            wwenc(self.socket, "550 Not Accessible\r\n");
                            self._traceIf(0, "Error at read other than ENOENT " + err, self);
                        }
                    }
                    else {
                        readChunk();
                    }
                });
            }
        });
    });
}