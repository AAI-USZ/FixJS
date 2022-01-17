function () {
    this._logIf(0, "Client connection error: " + err, this.socket);
    this.socket.destroy();
}