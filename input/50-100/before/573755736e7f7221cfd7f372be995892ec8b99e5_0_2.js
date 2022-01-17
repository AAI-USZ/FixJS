function switchToSecure() {
                logIf(1, "Secure connection started");
                self.socket = cleartext;
                socket.addListener('data', dataListener);
                self.secure = true;
            }