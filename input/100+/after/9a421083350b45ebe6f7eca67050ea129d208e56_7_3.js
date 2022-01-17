function setDisplayedApp(origin, callback, url) {
    var currentApp = displayedApp, newApp = origin;

    // There are four cases that we handle in different ways:
    // 1) The new app is already displayed: do nothing
    // 2) We're going from the homescreen to an app
    // 3) We're going from an app to the homescreen
    // 4) We're going from one app to another (via card switcher)

    // Case 1
    if (currentApp == newApp) {
      // Just run the callback right away
      if (callback)
        callback();
    }
    // Case 2: homescreen->app
    else if (currentApp == null) {
      setAppSize(newApp);
      updateLaunchTime(newApp);
      openWindow(newApp, callback);
    }
    // Case 3: app->homescreen
    else if (newApp == null) {
      // Animate the window close
      closeWindow(currentApp, callback);
    }
    // Case 4: app-to-app transition
    else {
      // XXX Note: Hack for demo when current app want to set specific hash
      //           url in newApp(e.g. contact trigger SMS message list page).
      var frame = runningApps[newApp].frame;
      if (url && frame.src != url) {
        frame.src = url;
      }
      setAppSize(newApp);
      updateLaunchTime(newApp);
      closeWindow(currentApp, function closeWindow() {
        openWindow(newApp, callback);
      });
    }

    // Lock orientation as needed
    if (newApp == null) {  // going to the homescreen, so force portrait
      screen.mozLockOrientation('portrait-primary');
    } else {
      setOrientationForApp(newApp);
    }

    displayedApp = origin;

    // Update the loading icon since the displayedApp is changed
    updateLoadingIcon();

    // If the app has a attention screen open, displaying it
    AttentionScreen.showForOrigin(origin);
  }