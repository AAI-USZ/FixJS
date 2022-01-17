function(err, data) {
        if (err) {
          return callback(err);
        }

        callback(null, findProperty('calendar-home-set', data, true));
      }