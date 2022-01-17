function reset() {
        self.removeListener("connect", onConnect);
        self.removeListener("error", onError);
        clearTimeout(timeout);
    }