function (err) {
        if (err.code === "ECONNREFUSED" && retries) {
          setTimeout(tryConnect, retryDelay);
          retries--;
          retryDelay *= 2;
          return;
        }
        return callback(err);
      }