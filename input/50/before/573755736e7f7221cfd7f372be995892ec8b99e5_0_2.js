function switchToSecure() {
                    logIf(1, "Secure passive connection started");
                    self.dataSocket = cleartext;
                    setupPassiveListener();
                }