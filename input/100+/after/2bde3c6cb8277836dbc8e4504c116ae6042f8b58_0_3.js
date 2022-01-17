function () {
                    self._whenDataReady(function (pasvconn) {
                        pasvconn.write(contents);
                        wwenc(self.socket, "226 Closing data connection, sent " + self.totsize + " bytes\r\n");
                        pasvconn.end();
                    });
                }