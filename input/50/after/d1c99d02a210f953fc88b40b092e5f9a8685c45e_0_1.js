function(error, response) {
      if (error) {
        response = null;
      } else {
        response = (value) ? true : response;
      }

      callback(error, response);
    }