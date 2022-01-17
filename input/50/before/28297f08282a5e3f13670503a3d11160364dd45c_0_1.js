function (error) {
      if (error) return callback(error);

      build();
      callback();
    }