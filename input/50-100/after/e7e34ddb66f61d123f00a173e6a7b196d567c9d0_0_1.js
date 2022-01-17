function(buf, rinfo) {
    // receive udp messages only sent from parent
    if (rinfo.address !== bindAddress) return;

    console.error('[CHILD] %s received %s from %j',
                  process.pid,
                  util.inspect(buf.toString()),
                  rinfo);

    receivedMessages.push(buf);

    process.send({ message: buf.toString() });

    if (receivedMessages.length == messages.length) {
      process.nextTick(function() {
        listenSocket.close();
      });
    }
  }