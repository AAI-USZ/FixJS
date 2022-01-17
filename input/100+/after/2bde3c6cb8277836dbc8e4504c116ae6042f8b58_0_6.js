function (pasvconn) {
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
                            wwenc(self.socket, "226 Closing data connection, sent " + self.totsize + " bytes\r\n");
                            pasvconn.end();
                            self.fs.close(fd, function (err) {
                                if (err) self.server.emit("error", err);
                                self.totsize = 0;
                            });
                        }
                    });
                }