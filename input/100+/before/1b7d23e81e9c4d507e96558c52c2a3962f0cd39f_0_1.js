function() {

    client = net.connect(common.PORT, function() {

      //Send message to worker
      worker.send('message from master');
    });

    client.on('data', function(data) {
      // All data is JSON
      data = JSON.parse(data.toString());

      if (data.code === 'received message') {
        check('worker', data.echo === 'message from master');
      } else {
        throw new Error('worng TCP message recived: ' + data);
      }
    });

    // When the connection ends kill worker and shutdown process
    client.on('end', function() {
      worker.destroy();
    });

    worker.on('exit', function() {
      process.exit(0);
    });

  }