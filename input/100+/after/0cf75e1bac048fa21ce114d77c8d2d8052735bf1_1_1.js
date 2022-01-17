function() {

  function loadCSS() {
    try {
      var customCSS = Settings.get('background.configure.css');
      var style = document.createElement('style')
      style.innerHTML = customCSS
      document.getElementsByTagName('head')[0].appendChild(style)
    } catch (e) {
      console.debug("Custom CSS failed to load", e);
    }
  }

  function runJS() {
    try {
      console.log('hh');
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

  return {
    loadCSS: loadCSS,
    runJS: runJS
  }
}