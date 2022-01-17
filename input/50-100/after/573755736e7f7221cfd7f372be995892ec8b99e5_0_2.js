function switchToSecure() {
                self._logIf(1, "Secure connection started");
                self.socket = cleartext;
                self.socket.on('data', function (data) { self._onData(data); });
                self.secure = true;
            }