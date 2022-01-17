function () {
        logIf(0, "Establishing secure connection...");
        starttls.starttlsServer(self.socket, self.options.tlsOptions, function (err, cleartext) {
            if (err) {
                logIf(0, "Error upgrading connection to TLS: " + util.inspect(err));
                self.socket.end();
            }
            else if (! cleartext.authorized) {
                logIf(0, "Secure socket not authorized: " + util.inspect(cleartext.authorizationError));
                if (self.options.allowUnauthorizedTls) {
                    logIf(0, "Allowing unauthorized connection (allowUnauthorizedTls==true)");
                    switchToSecure();
                }
                else {
                    logIf(0, "Closing unauthorized connection (allowUnauthorizedTls==false)");
                    sekf.socket.end();
                }
            }
            else {
                switchToSecure();
            }
            
            function switchToSecure() {
                logIf(1, "Secure connection started");
                self.socket = cleartext;
                socket.addListener('data', dataListener);
                self.secure = true;
            }
        });
    }