function(error, response) {
      if (error) {
        response = null;
      } else {
        response = true;
      }

      callback(error, response);
    }