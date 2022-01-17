function(response) {
    if (response.status === 401) {
      callback([]);
    } else {
      window.console.log('An error was encountered in fetching the feed:',
          response);
    }
  }