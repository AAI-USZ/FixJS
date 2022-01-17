function() {
        if (portRangeErrorHandler) {
            self.pasv.removeListener('error', portRangeErrorHandler);
            self.pasv.addListener('error', normalErrorHandler);
        }

        logIf(3, "Passive data connection beginning to listen", self);

        var port = self.pasv.address().port;
        self.passive = new PassiveListener();
        self.dataHost = host;
        self.dataPort = port;
        logIf(3, "Passive data connection listening on port " + port, self);
        if (command == "PASV") {
            var i1 = parseInt(port / 256);
            var i2 = parseInt(port % 256);
            logIf(0, "227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ") [=" + host + ":" + port + "]\r\n", self);
            wwenc(self.socket, "227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ")\r\n");
        }
        else if (command == "EPSV") {
            wwenc(self.socket, "229 Entering Extended Passive Mode (|||" + port + "|)\r\n");
        }
    }