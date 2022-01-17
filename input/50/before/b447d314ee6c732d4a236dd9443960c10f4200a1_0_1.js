function(response) {
    if (response.status === 401) {
      callback([]);
    }
  }