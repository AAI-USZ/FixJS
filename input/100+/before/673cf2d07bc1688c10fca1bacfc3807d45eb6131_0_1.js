function transitionListener(e) {
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
    }