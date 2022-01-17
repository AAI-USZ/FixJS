function (commandArg) {
    if (! self.options.tlsOptions)
        return wwenc(self.socket, "202 Not supported\r\n");
    
    if (! self.conn.pbszReceived) {
        wwenc(self.socket, "503 No PBSZ command received\r\n");
    }
    else if (commandArg == 'S' || commandArg == 'E' || commandArg == 'C') {
        wwenc(self.socket, "536 Not supported\r\n");
    }
    else if (commandArg == 'P') {
        wwenc(self.socket, "200 OK\r\n");
    }
    else {
        // Don't even recognize this one...
        wwenc(self.socket, "504 Not recognized\r\n");
    }
}