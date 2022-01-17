function (cmd, callback /* (data: buffer) */) {
    this.connect(function (session) {
        session.recvData(callback);
        session.sendData(cmd);
    });
}