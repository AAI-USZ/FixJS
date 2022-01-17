function (err, s) {
        if(err) { 
            self._traceIf(0, "Error getting size of file: "+filename, self.socket);
            wwenc(self.socket, "450 Failed to get size of file\r\n");
            return;
        }
        wwenc(self.socket, "213 " + s.size + "\r\n");
    }