function (commandArg) {
    if (! self.server.options.tlsOptions)
        return wwenc(socket, "202 Not supported\r\n");
    
    // Protection Buffer Size (RFC 2228)
    if (! self.secure) {
        wwenc(self.socket, "503 Secure connection not established\r\n");
    }
    else if (parseInt(commandArg) != 0) {
        // RFC 2228 specifies that a 200 reply must be sent specifying a more
        // satisfactory PBSZ size (0 in our case, since we're using TLS).
        // Doubt that this will do any good if the client was already confused
        // enough to send a non-zero value, but ok...
        self.pbszReceived = true;
        wwenc(self.socket, "200 buffer too big, PBSZ=0\r\n");
    }
    else {
        self.pbszReceived = true;
        wwenc(self.socket, "200 OK\r\n");
    }
}