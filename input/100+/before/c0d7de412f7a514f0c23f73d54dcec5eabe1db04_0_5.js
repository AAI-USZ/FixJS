function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
    switch (packet.type) {
      case 'open':
        this.onHandshake(util.parseJSON(packet.data));
        break;

      case 'ping':
        this.sendPacket('pong');
        this.setPingTimeout();
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.emit('error', err);
        break;

      case 'message':
        this.emit('message', packet.data);
        this.onmessage && this.onmessage.call(this, { data: packet.data });
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
}