function (err, cleartext) {
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
            }