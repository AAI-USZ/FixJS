function onTimeout() {
        var err = new Error("ETIMEDOUT: Timeout while waiting for Agent agent to connect.");
        err.code = "ETIMEDOUT";
        self.emit("error", err);
    }