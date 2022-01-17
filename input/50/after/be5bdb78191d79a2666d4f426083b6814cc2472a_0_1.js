function(recv_buf, flushCallback) {
    this.send_buf = '';
    this.recv_buf = recv_buf || '';
    this.flushCallback = flushCallback;
}