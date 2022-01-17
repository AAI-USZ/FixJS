function (client) {
        // Wrap the local vfs in a worker.  We will serve it over http using the
        // websocket channel.
        var worker = new Worker(vfs);
        worker.connect(new WebSocketTransport(client));
        worker.on("error", function (err) {
          if (err && err.stack) console.error(err.stack);
          client.terminate();
        });
    }