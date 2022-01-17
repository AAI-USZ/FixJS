function afterOk(callback) {
        wwenc(self.socket, "150 Opening " + self.mode.toUpperCase() + " mode data connection\r\n", callback);
    }