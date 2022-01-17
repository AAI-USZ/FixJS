function(err, authorized, data) {
      if (!err && !authorized) {
        err = new Error('unauthorized');
      }

      if (err) {
        client.error(err);
        client.end();

      } else {
        var packet = new OutgoingPacket(client, packets.TYPE_HANDSHAKE, binson.calculate(data));
        packet.writeBinson(data);
        client.sendPacket(packet);

        client.onAuthorized(data);
      }
    }