function (commandArg) {
    var self = this;

    // Rename to.
    if (!self._authenticated())
        return;

    var fileto = withCwd(self.cwd, commandArg);
    self.fs.rename( PathModule.join(self.root, self.filefrom), PathModule.join(self.root, fileto), function(err){
        if(err) {
            self._logIf(3, "Error renaming file from " + self.filefrom + " to " + fileto, self.socket);
            wwenc(self.socket, "550 Rename failed\r\n");
        } else {
            wwenc(self.socket, "250 File renamed successfully\r\n");
        }
    });
}