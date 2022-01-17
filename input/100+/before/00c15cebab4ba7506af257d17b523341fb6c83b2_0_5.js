function (commandArg) {
    var self = this;

    // Rename to.
    if (!self._authenticated())
        return;

    var fileto = PathModule.join(self.root, withCwd(self.cwd, commandArg));
    self.fs.rename( self.filefrom, fileto, function(err){
        if(err) {
            self._logIf(3, "Error renaming file from " + self.filefrom + " to " + fileto, self.socket);
            wwenc(self.socket, "550 Rename failed\r\n");
        } else {
            wwenc(self.socket, "250 File renamed successfully\r\n");
        }
    });
}