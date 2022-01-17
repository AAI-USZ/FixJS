function(data) {
      // All data is JSON
      data = JSON.parse(data.toString());

      if (data.code === 'received message') {
        check('worker', data.echo === 'message from master');
      } else {
        throw new Error('worng TCP message recived: ' + data);
      }
    }