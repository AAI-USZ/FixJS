function done(e) {
    // Recompute and reposition the photo that just transitioned off the screen
    nextPhotoState.reset();

    // FIXME: I want a jquery-style once() utility for auto removal
    nextPhotoFrame.removeEventListener('transitionend', done);
  }