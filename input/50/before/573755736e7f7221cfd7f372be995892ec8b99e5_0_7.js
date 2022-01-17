function () {
    lofIf(0, "Client connection error: " + err, this.socket);
    this.socket.destroy();
}