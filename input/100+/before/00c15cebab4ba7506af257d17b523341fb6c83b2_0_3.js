function (commandArg) {
    var self = this;

    // Remove a directory.
    if (!self._authenticated())
        return;

    var filename = PathModule.join(self.root, withCwd(self.cwd, commandArg));
    self.fs.rmdir( filename, function(err){
        if(err) {
            self._logIf(0, "Error removing directory " + filename, self.socket);
            wwenc(self.socket, "550 Delete operation failed\r\n");
        } else
            wwenc(self.socket, "250 \"" + filename + "\" directory removed\r\n");
    });
}