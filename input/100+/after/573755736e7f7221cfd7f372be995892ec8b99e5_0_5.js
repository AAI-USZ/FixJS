function (err, cleartext) {
            if (err) {
                self._logIf(0, "Error upgrading connection to TLS: " + util.inspect(err));
                self.socket.end();
            }
            else if (! cleartext.authorized) {
                self._logIf(0, "Secure socket not authorized: " + util.inspect(cleartext.authorizationError));
                if (self.server.options.allowUnauthorizedTls) {
                    self._logIf(0, "Allowing unauthorized connection (allowUnauthorizedTls==true)");
                    switchToSecure();
                }
                else {
                    self._logIf(0, "Closing unauthorized connection (allowUnauthorizedTls==false)");
                    sekf.socket.end();
                }
            }
            else {
                switchToSecure();
            }
            
            function switchToSecure() {
                self._logIf(1, "Secure connection started");
                self.socket = cleartext;
                self.socket.on('data', function (data) { self._onData(data); });
                self.secure = true;
            }
        }