function (commandArg) {
    var self = this;

    // Delete file.
    if (!self._authenticated())
        return;

    var filename = PathModule.join(self.root, withCwd(self.cwd, commandArg));
    self.fs.unlink( filename, function(err){
        if (err) {
            self._logIf(0, "Error deleting file: "+filename+", "+err, self);
            // write error to socket
            wwenc(self.socket, "550 Permission denied\r\n");
        } else {
            wwenc(self.socket, "250 File deleted\r\n");
        }
    });
}