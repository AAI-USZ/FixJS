function(error, response) {
      if (error) {
        response = null;
      } else {
        response = (value !== undefined) ? true : response;
      }

      callback(error, response);
    }