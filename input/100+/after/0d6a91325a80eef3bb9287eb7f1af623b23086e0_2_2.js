function() {
  debug('Handle handshake packet')
  var handshakeData, client = this.client, server = client.server;

  try {
    handshakeData = this.readBinson();
  } catch(err) {
    client.emit('error', err);
    return;
  }

  if (!server) {
    client.onAuthorized(handshakeData);

  } else {
    handshakeData = client.handshakeData(handshakeData);


    server.authorize(handshakeData, function(err, authorized, data) {
      if (!err && !authorized) {
        err = new Error('unauthorized');
      }

      if (err) {
        client.error(err);
        client.destroySoon();

      } else {
        var packet = new OutgoingPacket(client, packets.TYPE_HANDSHAKE, binson.calculate(data));
        packet.writeBinson(data);
        client.sendPacket(packet);

        client.onAuthorized(data);
      }
    });
  }
}