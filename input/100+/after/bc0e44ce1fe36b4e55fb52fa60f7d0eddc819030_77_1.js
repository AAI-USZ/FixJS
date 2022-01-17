function open(url, callback) {
    if (!url)
      return;

    // If the trusted dialog is being shown we swap frames.
    if (trustedDialogIsShown()) {
      trustedDialogElement.removeChild(currentFrame);
      currentFrame = null;
    } else {
      // Save the current displayed app in order to show it after closing the
      // trusted dialog.
      lastDisplayedApp = WindowManager.getDisplayedApp();
      // Show the homescreen.
      WindowManager.setDisplayedApp(null);
    }

    // Create the iframe to be shown as a trusted dialog.
    var frame = document.createElement('iframe');
    frame.setAttribute('mozbrowser', 'true');
    frame.classList.add('frame');
    frame.classList.add('screen');
    frame.src = url;
    if (callback)
      frame.addEventListener('mozbrowserloadend', callback);
    trustedDialogElement.appendChild(frame);
    currentFrame = frame;

    if (!trustedDialogIsShown()) {
      // Make the trusted dialog overlay active.
      trustedDialogElement.classList.add('active');
      // Make sure we're in portrait mode.
      screen.mozLockOrientation('portrait');
    }

    return frame;
  }