function(err, fd_) {
        fd = fd_;
        if(err) {
            self._traceIf(0, 'Error opening/creating file: ' + filename, self.socket);
            wwenc(self.socket, "553 Could not create file\r\n");
            self.dataSocket.end();
            return;
        }
        self._logIf(3, "File opened/created: " + filename, self.socket);
        self._logIf(3, "Told client ok to send file data", self.socket);

        wwenc(self.socket, "150 Ok to send data\r\n", function () {
            self._whenDataReady(handleUpload);
        });
    }