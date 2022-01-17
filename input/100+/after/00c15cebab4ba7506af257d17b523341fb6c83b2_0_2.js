function (commandArg) {
    var self = this;

    if (! self._authenticated())
        return;

    var filename = withCwd(self.cwd, commandArg);
    self.fs.mkdir( PathModule.join(self.root, filename), 0755, function(err){
        if(err) {
            self._logIf(0, "Error making directory " + filename + " because " + err, self);
            // write error to socket
            wwenc(self.socket, "550 \"" + filename + "\" directory NOT created\r\n");
            return;
        }
        wwenc(self.socket, "257 \"" + filename + "\" directory created\r\n");
    });
}