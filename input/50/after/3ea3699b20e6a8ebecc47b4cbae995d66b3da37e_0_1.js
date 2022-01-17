function(exception) {
        self.emit("netError", exception);
        self.conn.destroy();
    }