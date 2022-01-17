function (commandArg) {
    var self = this;

    // Return the size of a file. (RFC 3659)
    if (!self._authenticated())
        return;

    var filename = withCwd(self.cwd, commandArg);
    self.fs.stat( PathModule.join(self.root, filename), function (err, s) {
        if(err) { 
            self._traceIf(0, "Error getting size of file: " + filename, self.socket);
            wwenc(self.socket, "450 Failed to get size of file\r\n");
            return;
        }
        wwenc(self.socket, "213 " + s.size + "\r\n");
    });
}