function (commandArg, command) {
    var self = this;

    if (!self._authenticated())
        return;

    if (command == "EPSV" && commandArg && commandArg != "1") {
        wwenc(self.socket, "202 Not supported\r\n");
        return;
    }

    // not sure whether the spec limits to 1 data connection at a time ...
    if (self.dataListener) self.dataListener.close(); // we're creating a new listener
    if (self.dataSocket) self.dataSocket.end(); // close any existing connections
    self.dataListener = null;
    self.dataSocket = null;

    var pasv = self._createPassiveServer();
    var portRangeErrorHandler;
    function normalErrorHandler(e) {
        self._logIf(3, "Error with passive data listener: " + util.inspect(e), self);
    }
    if (self.server.options.pasvPortRangeStart && self.server.options.pasvPortRangeEnd) {
        // Keep trying ports in the range supplied until either:
        //     (i)   It works
        //     (ii)  We get an error that's not just EADDRINUSE
        //     (iii) We run out of ports to try.
        var i = self.server.options.pasvPortRangeStart;
        self.pasv.listen(i);
        portRangeErrorHandler = function (e) {
            if (e.code == 'EADDRINUSE' && i < self.server.options.pasvPortRangeEnd)
                self.pasv.listen(++i);
        };
        self.pasv.on('error', portRangeErrorHandler);
    }
    else {
        self.pasv.listen(0);
        self.pasv.on('error', normalErrorHandler);
    }
    self.dataListener = pasv;
    // Once we're successfully listening, tell the client
    self.pasv.on("listening", function() {
        if (portRangeErrorHandler) {
            self.pasv.removeListener('error', portRangeErrorHandler);
            self.pasv.addListener('error', normalErrorHandler);
        }

        self._logIf(3, "Passive data connection beginning to listen", self);

        var port = self.pasv.address().port;
        self.passive = new PassiveListener();
        self.dataHost = host;
        self.dataPort = port;
        self._logIf(3, "Passive data connection listening on port " + port, self);
        if (command == "PASV") {
            var i1 = parseInt(port / 256);
            var i2 = parseInt(port % 256);
            self._logIf(0, "227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ") [=" + host + ":" + port + "]\r\n", self);
            wwenc(self.socket, "227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ")\r\n");
        }
        else if (command == "EPSV") {
            wwenc(self.socket, "229 Entering Extended Passive Mode (|||" + port + "|)\r\n");
        }
    });
    self.pasv.on("close", function() {
        self._logIf(3, "Passive data listener closed", self);
    });
}