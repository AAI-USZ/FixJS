function (err) {
                    if (err) {
                        self._logIf(0, "Error closing file following 'end' message", err);
                        wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                        return;
                    }
                    
                    wwenc(self.socket, "226 Closing data connection\r\n");
                }