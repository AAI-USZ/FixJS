function () {
    ghost = new Ghost("http://github.com/", 
      {browser: config.browser, host: config.host, logLevel: config.logLevel});
  }