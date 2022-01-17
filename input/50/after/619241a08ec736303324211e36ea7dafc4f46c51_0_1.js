function(err, data) {
        if (err) {
          return callback(err);
        }

        details = {
          url: findProperty('calendar-home-set', data, true)
        };

        callback(null, details);
      }