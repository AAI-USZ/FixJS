function (transport, callback) {
    // If they passed in a raw stream, wrap it.
    if (!(transport instanceof Transport)) transport = new Transport(transport);

    this.transport = transport;
    this.callbacks = {};
    this.nextKey = 1;
    transport.on("error", this.disconnect);
    transport.on("disconnect", this.disconnect);
    transport.on("message", this._onMessage);
    transport.on("drain", this._onDrain);

    // Handshake with the other end
    this.send(["ready", this._onReady]);

    // Start timeout and route events to callback
    this.on("connect", onConnect);
    this.on("error", onError);
    if (this.connectionTimeout) {
        var timeout = setTimeout(onTimeout, this.connectionTimeout);
    }

    var self = this;
    function onConnect(api) {
        reset();
        if (callback) callback(null, api);
    }
    function onError(err) {
        reset();
        if (callback) callback(err);
        else self.emit("error", err);
    }
    function onTimeout() {
        var err = new Error("ETIMEDOUT: Timeout while waiting for Agent agent to connect.");
        err.code = "ETIMEDOUT";
        self.emit("error", err);
    }
    // Only one event should happen, so stop event listeners on first event.
    function reset() {
        self.removeListener("connect", onConnect);
        self.removeListener("error", onError);
        clearTimeout(timeout);
    }
}