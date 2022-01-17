function(url, callback) {
      var find = new Propfind(this.connection, {
        url: url
      });

      find.prop(['caldav', 'calendar-home-set']);

      find.send(function(err, data) {
        if (err) {
          return callback(err);
        }

        callback(null, findProperty('calendar-home-set', data, true));
      });
    }