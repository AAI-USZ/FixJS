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
                afterOk(function () {
                    self._whenDataReady(function (pasvconn) {
                        pasvconn.write(contents);
                        wwenc(self.socket, "226 Closing data connection, sent " + self.totsize + " bytes\r\n");
                        pasvconn.end();
                    });
                });
            }
        }