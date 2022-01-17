function (err) {
                if (err) {
                    self.dataSocket.removeListener('data', dataHandler);
                    logIf(0, "Error closing file following error on dataSocket", err);
                    wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                }
            }