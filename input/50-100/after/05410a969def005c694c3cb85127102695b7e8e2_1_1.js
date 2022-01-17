function runJS() {
    try {
      var customJS = Settings.get('configure.js');
      if (customJS) {
        eval(customJS);
        if (typeof frontendExec != "undefined") {
          frontendExec();
        }
      }
    } catch (e) {
      console.debug("Custom JS failed to load", e);
    }
  }