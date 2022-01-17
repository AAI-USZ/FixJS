function (err, contents) {
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
                        if (self.pasvconn.readyState == 'open')
                            self.pasvconn.write(contents)
                        self.pasvconn.end();
                        wwenc(self.socket, "226 Closing data connection, sent " + self.totsize + " bytes\r\n");
                    }
                }