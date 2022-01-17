function reset() {
        self.removeListener("connect", onConnect);
        self.removeListener("disconnect", onError);
        self.removeListener("error", onError);
        clearTimeout(timeout);
    }