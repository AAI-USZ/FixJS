function (socket) {
      socket.setTimeout(5000);
      socket.on('timeout', function () {
        console.error(util.format('Disabled %s, timed out.', item.hostname));
        req.abort();
        return callback(false);
      });
    }