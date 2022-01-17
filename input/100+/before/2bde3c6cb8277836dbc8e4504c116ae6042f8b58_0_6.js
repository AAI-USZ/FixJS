function (commandArg) {
    var self = this;

    var filename = withCwd(self.cwd, commandArg);
    self.fs.rmdir( PathModule.join(self.root, filename), function(err){
        if(err) {
            self._logIf(0, "Error removing directory " + filename, self.socket);
            wwenc(self.socket, "550 Delete operation failed\r\n");
        } else
            wwenc(self.socket, "250 \"" + filename + "\" directory removed\r\n");
    });
}