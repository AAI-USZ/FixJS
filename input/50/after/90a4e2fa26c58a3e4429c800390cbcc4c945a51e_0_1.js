function () {
    ghost = new Ghost("http://www.google.com/webhp?complete=1&hl=en", 
      {browser: config.browser, host: config.host, logLevel: config.logLevel});
  }