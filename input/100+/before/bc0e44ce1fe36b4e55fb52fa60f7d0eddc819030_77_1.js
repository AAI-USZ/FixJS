function open(trustedFrame) {
    if (!trustedFrame)
      return;

    // We only allow one trusted dialog at a time.
    if (trustedDialogIsShown())
      return;

    lastDisplayedApp = WindowManager.getDisplayedApp();

    // Show the homescreen.
    WindowManager.setDisplayedApp(null);

    // Create the iframe to be shown as a trusted dialog.
    var frame = document.createElement('iframe');
    frame.dataset.frameType = 'window';
    frame.dataset.frameOrigin = trustedFrame.url;
    frame.setAttribute('mozbrowser', 'true');
    frame.classList.add('frame');
    frame.classList.add('screen');
    frame.src = trustedFrame.url;
    trustedDialogElement.appendChild(frame);
    currentFrame = frame;

    // Make the trusted dialog overlay active.
    trustedDialogElement.classList.add('active');

    // Make sure we're in portrait mode.
    screen.mozLockOrientation('portrait');

    return frame;
  }