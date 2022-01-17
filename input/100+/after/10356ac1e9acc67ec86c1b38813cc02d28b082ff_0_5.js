function (data, req) {
  var socket = req.socket
    , store = this.store
    , self = this;

  if (undefined != data.query.disconnect) {
    if (this.transports[data.id] && this.transports[data.id].open) {
      this.transports[data.id].onForcedDisconnect();
    } else {
      this.store.publish('disconnect-force:' + data.id);
    }
    return;
  }

  if (!~this.get('transports').indexOf(data.transport)) {
    this.log.warn('unknown transport: "' + data.transport + '"');
    req.connection.end();
    return;
  }

  var transport = new transports[data.transport](this, data, req)
    , handshaken = this.handshaken[data.id];

  if (transport.disconnected) {
    // failed during transport setup
    req.connection.end();
    return;
  }
  if (handshaken) {
    if (transport.open) {
      if (this.closed[data.id] && this.closed[data.id].length) {
        transport.payload(this.closed[data.id]);
        this.store.publish('dispatched', data.id, this.closed[data.id]);
        this.closed[data.id] = [];
      }

      this.onOpen(data.id);
      this.store.publish('open', data.id);
      this.transports[data.id] = transport;
    }

    if (!this.connected[data.id]) {
      this.onConnect(data.id);
      this.store.publish('connect', data.id);

      // flag as used
      delete handshaken.issued;
      this.onHandshake(data.id, handshaken);
      this.store.publish('handshake', data.id, handshaken);

      // initialize the socket for all namespaces
      for (var i in this.namespaces) {
        var socket = this.namespaces[i].socket(data.id, true);

        // echo back connect packet and fire connection event
        if (i === '') {
          this.namespaces[i].handlePacket(data.id, { type: 'connect' });
        }
      }

      this.store.subscribe('message:' + data.id, function (packet) {
        self.onClientMessage(data.id, packet);
      });

      this.store.subscribe('disconnect:' + data.id, function (reason) {
        self.onClientDisconnect(data.id, reason);
      });
    }
  } else {
    if (transport.open) {
      transport.error('client not handshaken', 'reconnect');
    }

    transport.discard();
  }
}