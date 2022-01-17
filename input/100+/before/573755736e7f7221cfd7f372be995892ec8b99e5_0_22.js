function (buf) {
            if (erroredOut)
                return;

            self.dataSocket.removeListener('data', dataHandler);
            
            // If we kept it all in the slurp buffer, finally write it out.
            if (slurpBuf) {
                logIf(0, "Writing out file from slurp buffer");
                self.fs.write(fd, slurpBuf, 0, totalBytes, null, function (err) {
                    if (err) {
                        logIf(0, "Error writing slurp buffer to file following 'end' message", err);
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
                        logIf(0, "Error closing file following 'end' message", err);
                        wwenc(self.socket, "426 Connection closed; transfer aborted\r\n");
                        return;
                    }
                    
                    wwenc(self.socket, "226 Closing data connection\r\n");
                });
            }
        }