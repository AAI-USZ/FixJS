function(url, callback) {
      var details = {};
      var find = new Propfind(this.connection, {
        url: url
      });

      find.prop(['caldav', 'calendar-home-set']);

      find.send(function(err, data) {
        if (err) {
          return callback(err);
        }

        details = {
          url: findProperty('calendar-home-set', data, true)
        };

        callback(null, details);
      });
    }