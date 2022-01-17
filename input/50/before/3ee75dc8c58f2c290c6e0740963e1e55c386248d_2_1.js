function(response) {
    if (response.status === 401) {
      common.isAuthenticated = false;
      callback([]);
    }
  }