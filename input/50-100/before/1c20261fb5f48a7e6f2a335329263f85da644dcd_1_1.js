function closeWindow(origin, callback) {
    var app = runningApps[origin];
    closeFrame = app.frame;
    closeCallback = callback || function() {};

    // Send a synthentic 'appwillclose' event.
    // The keyboard uses this and the appclose event to know when to close
    // See https://github.com/andreasgal/gaia/issues/832
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('appwillclose', true, false, {});
    closeFrame.dispatchEvent(evt);

    // Take keyboard focus away from the closing window
    closeFrame.blur();
    closeFrame.setVisible(false);

    // And begin the transition
    sprite.classList.remove('faded');
    sprite.classList.add('close');
  }