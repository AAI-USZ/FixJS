function (err) {
        if (err)
            self._logIf(0, "Error writing 'Goodbye' message following QUIT", err);                       
        self.socket.end();
        self._closeDataConnections();
    }