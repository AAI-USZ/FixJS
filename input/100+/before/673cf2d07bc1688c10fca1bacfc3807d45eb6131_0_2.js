function openWindow(origin, callback) {
    var app = runningApps[origin];
    var frame = app.frame;
    var manifest = app.manifest;

    // Create a window sprite element to perform an window open animation.
    // Start it off in its 'closed' state.
    var sprite = document.createElement('div');
    sprite.className = 'closed windowSprite';

    // Make the sprite look like the app that it is animating for.
    // Animating an image resize is quicker than animating and resizing
    // the live app in its iframe.  But if even this background image
    // animation is too slow, then just comment this line out.
    //sprite.style.background = '-moz-element(#' + frame.id + ') no-repeat';

    // Add the sprite to the document
    document.body.appendChild(sprite);

    // Query css to flush this change
    var width = document.documentElement.clientWidth;

    // And start the animation
    sprite.classList.add('open');
    sprite.classList.remove('closed');

    // This event handler is triggered when the transition ends.
    // We're going to do two transitions, so it gets called twice.
    sprite.addEventListener('transitionend', function transitionListener(e) {
      // Only listen for opacity transition
      // Otherwise we may get called multiple times for each transition
      if (e.propertyName !== 'opacity')
        return;

      // If the sprite is not yet faded
      if (!sprite.classList.contains('faded')) {
        // The first transition has just completed.
        // Make the app window visible and then fade the sprite away
        // while hardening agains super fast app launch/close
        if (!currentlyClosing) {
          frame.classList.add('active');
          windows.classList.add('active');
        }

        sprite.classList.add('faded');

        if ('setVisible' in frame) {
          frame.setVisible(true);
        }
      } else {
        // The second transition has just completed
        // give the app focus and discard the sprite.
        frame.focus();
        document.body.removeChild(sprite);
        // Finally, call the callback if there is one.
        if (callback)
          callback();
      }
    });

    // FIXME
    // We broadcast an 'appopen' event here.
    // Currently notification screen code in homescreen.js listens for
    // this event and uses it to clear notifications when the dialer
    // or sms apps are opened up. We probably need a better way to do this.
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('appopen', true, false, { url: origin });
    frame.dispatchEvent(evt);
  }