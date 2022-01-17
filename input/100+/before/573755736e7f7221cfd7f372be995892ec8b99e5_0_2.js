function (psocket) {
        logIf(1, "Passive data event: connect", self);

        if (self.secure) {
            logIf(1, "Upgrading passive connection to TLS");
            starttls.starttlsServer(psocket, self.options.tlsOptions, function (err, cleartext) {
                if (err) {
                    logIf(0, "Error upgrading passive connection to TLS:" + util.inspect(err));
                    psocket.end();
                }
                else if (! cleartext.authorized) {
                    if (self.options.allowUnauthorizedTls) {
                        logIf(0, "Allowing unauthorized passive connection (allowUnauthorizedTls==true)");
                        switchToSecure();
                    }
                    else {
                        logIf(0, "Closing unauthorized passive connection (allowUnauthorizedTls==false)");
                        self.socket.end();
                    }
                }
                else {
                    switchToSecure();
                }
                
                function switchToSecure() {
                    logIf(1, "Secure passive connection started");
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
                logIf(3, "Passive data event: end", conn);
                self.dataSocket = null;
            });
            self.dataSocket.addListener("error", function(err) {
                logIf(0, "Passive data event: error: " + err, conn);
                self.dataSocket = null;
            });
            self.dataSocket.addListener("close", function(had_error) {
                logIf(
                    (had_error ? 0 : 3),
                    "Passive data event: close " + (had_error ? " due to error" : ""),
                    self.socket
                );
            });
        }
    }