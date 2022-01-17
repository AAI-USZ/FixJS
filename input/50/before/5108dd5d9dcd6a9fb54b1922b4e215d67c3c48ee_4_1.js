function(data) {
              if (page !== "users/profile") {
                cache.set(page, data, {
                   secondsToLive: 10 * 60
                });
              }
              return callback(data);
            }