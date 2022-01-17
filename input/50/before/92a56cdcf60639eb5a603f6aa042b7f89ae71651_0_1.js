function done(e) {
    // Recompute and reposition the photo that just transitioned off the screen
    previousPhotoState.reset();

    // FIXME: I want a jquery-style once() utility for auto removal
    previousPhotoFrame.removeEventListener('transitionend', done);
  }