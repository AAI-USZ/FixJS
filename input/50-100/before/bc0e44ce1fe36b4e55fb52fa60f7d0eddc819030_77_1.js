function close(callback) {
    if (!trustedDialogIsShown())
      return;

    // Make the trusted dialog overlay inactive and remove the frame from
    // the trusted dialog container.
    trustedDialogElement.classList.remove('active');
    trustedDialogElement.removeChild(currentFrame);
    currentFrame = null;
    // Shows the previously displayed app.
    WindowManager.setDisplayedApp(lastDisplayedApp);
    // Switch back to apps orientation.
    WindowManager.setOrientationForApp(lastDisplayedApp);

    callback();
  }