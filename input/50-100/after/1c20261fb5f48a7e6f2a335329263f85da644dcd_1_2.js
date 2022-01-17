function(e) {
    // If we see the Back key, and it hasn't been cancelled, and there
    // is an app displayed, then hide the app and go back to the
    // homescreen. Unlike the Home key, apps can intercept this event
    // and use it for their own purposes.
    if (e.keyCode === e.DOM_VK_ESCAPE &&
        !e.defaultPrevented &&
        displayedApp !== null) {

      setDisplayedApp(null); // back to the homescreen
    }
  }