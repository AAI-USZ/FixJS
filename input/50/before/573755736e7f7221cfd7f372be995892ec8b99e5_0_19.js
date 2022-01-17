function (err) {
                    if (err) {
                        logIf(0, "Error writing slurp buffer to file following 'end' message", err);
                        wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                        return;
                    }
                    
                    onceOnDisk();
                }