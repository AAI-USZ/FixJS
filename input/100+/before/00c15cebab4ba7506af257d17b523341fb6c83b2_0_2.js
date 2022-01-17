function (commandArg) {
    var self = this;

    if (! self._authenticated())
        return;

    var filename = PathModule.join(self.root, withCwd(self.cwd, commandArg));
    self.fs.mkdir( filename, 0755, function(err){
        if(err) {
            self._logIf(0, "Error making directory " + filename + " because " + err, self);
            // write error to socket
            wwenc(self.socket, "550 \"" + filename + "\" directory NOT created\r\n");
            return;
        }
        wwenc(self.socket, "257 \"" + filename + "\" directory created\r\n");
    });
}