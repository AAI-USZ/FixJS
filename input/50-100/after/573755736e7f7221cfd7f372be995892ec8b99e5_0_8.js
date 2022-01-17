function (commandArg) {
    var self = this;

    if (!self._authenticated())
        return;

    self.filefrom = withCwd(self.cwd, commandArg);
    self._logIf(3, "Rename from " + self.filefrom, self.socket);
    self.fs.exists( self.filefrom, function(exists) {
        if (exists) wwenc(self.socket, "350 File exists, ready for destination name\r\n");
        else wwenc(self.socket, "350 Command failed, file does not exist\r\n");
    });
}