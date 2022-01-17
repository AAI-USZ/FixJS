function (psocket) {
        self._logIf(1, "Passive data event: connect", self);

        if (self.secure) {
            self._logIf(1, "Upgrading passive connection to TLS");
            starttls.starttlsServer(psocket, self.server.options.tlsOptions, function (err, cleartext) {
                if (err) {
                    self._logIf(0, "Error upgrading passive connection to TLS:" + util.inspect(err));
                    psocket.end();
                }
                else if (! cleartext.authorized) {
                    if (self.server.options.allowUnauthorizedTls) {
                        self._logIf(0, "Allowing unauthorized passive connection (allowUnauthorizedTls==true)");
                        switchToSecure();
                    }
                    else {
                        self._logIf(0, "Closing unauthorized passive connection (allowUnauthorizedTls==false)");
                        self.socket.end();
                    }
                }
                else {
                    switchToSecure();
                }
                
                function switchToSecure() {
                    self._logIf(1, "Secure passive connection started");
                    self.dataSocket = cleartext;
                    setupPassiveListener();
                }
            });
        }
        else {
            self.dataSocket = psocket;
            setupPassiveListener();
        }

        function setupPassiveListener() {
            self.passive.emit('ready');
            
            self.dataSocket.on("end", function () {
                self._logIf(3, "Passive data event: end", self);
                self.dataSocket = null;
            });
            self.dataSocket.on("error", function(err) {
                self._logIf(0, "Passive data event: error: " + err, self);
                self.dataSocket = null;
            });
            self.dataSocket.on("close", function(had_error) {
                self._logIf(
                    (had_error ? 0 : 3),
                    "Passive data event: close " + (had_error ? " due to error" : ""),
                    self.socket
                );
            });
        }
    }