function closeWindow(origin, instant, callback) {
    var app = runningApps[origin];
    var frame = app.frame;
    var manifest = app.manifest;

    // Send a synthentic 'appwillclose' event.
    // The keyboard uses this and the appclose event to know when to close
    // See https://github.com/andreasgal/gaia/issues/832
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('appwillclose', true, false, {});
    frame.dispatchEvent(evt);

    // Send a synthentic 'appclose' event.
    // The keyboard uses this event to know when to close
    // FIXME: this second event should probably happen
    // below, after the animation. But the event isn't being
    // delivered correctly if I do that.
    // See https://github.com/andreasgal/gaia/issues/832
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('appclose', true, false, {});
    frame.dispatchEvent(evt);

    // Take keyboard focus away from the closing window
    frame.blur();

    if ('setVisible' in frame) {
      frame.setVisible(false);
    }

    // If we're not doing an animation, then just switch directly
    // to the closed state.
    if (instant) {
      frame.classList.remove('active');
      if (callback)
        callback();
      return;
    }

    // Create a window sprite object in the open state, then hide
    // the app window and transition the sprite down to the closed state.
    var sprite = document.createElement('div');
    sprite.className = 'open windowSprite';

    // Make the sprite look like the app that it is animating for.
    // Animating an image resize is quicker than animating and resizing
    // the live app in its iframe.  But if even this background image
    // animation is too slow, then just comment this line out.
    //sprite.style.background = '-moz-element(#' + frame.id + ') no-repeat';

    // Add the sprite to the document
    document.body.appendChild(sprite);

    // And close the real app window
    frame.classList.remove('active');
    windows.classList.remove('active');

    // Query css to flush this change
    var width = document.documentElement.clientWidth;

    // And begin the transition
    sprite.classList.remove('open');
    sprite.classList.add('closed');

    // When the transition ends, discard the sprite.
    sprite.addEventListener('transitionend', function transitionListener() {
      sprite.removeEventListener('transitionend', transitionListener);
      document.body.removeChild(sprite);
      if (callback)
        callback();
    });
  }