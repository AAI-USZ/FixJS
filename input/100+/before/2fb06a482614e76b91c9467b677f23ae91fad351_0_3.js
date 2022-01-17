function () {
        if (callbacks++) throw new Error("multiple callbacks");
        return function (error, result) {
          if (error) done(error);
          else consumer(result);
        }
      }