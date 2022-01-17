function (commandArg) {
    var self = this;

    // Delete file.
    if (!self._authenticated())
        return;

    var filename = withCwd(self.cwd, commandArg);
    self.fs.unlink( PathModule.join(self.root, filename), function(err){
        if (err) {
            self._logIf(0, "Error deleting file: " + filename + ", "+err, self);
            // write error to socket
            wwenc(self.socket, "550 Permission denied\r\n");
        } else {
            wwenc(self.socket, "250 File deleted\r\n");
        }
    });
}