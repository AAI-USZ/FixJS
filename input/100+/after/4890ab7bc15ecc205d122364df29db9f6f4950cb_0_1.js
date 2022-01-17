function (res) {
      if (res.statusCode !== 200) {
        console.log(util.format('Disabled %s, gave status code: %d', item.hostname, res.statusCode));
        return callback(false);
      }

      var data = '';
      res.on('data', function (chunk) {
        data = data + chunk;
      });

      res.on('end', function () {
        if (data.length === 11) {
          return callback(true);
        } else {
          console.log(util.format('Disabled %s, gave incorrect amount of data: %d bytes', item.hostname, data.length));
          return callback(false);
        }
      });

      res.on('error', function (err) {
        console.log(util.format('Disabled %s, gave error: %s', item.hostname, err));
        return callback(false);
      });
    }