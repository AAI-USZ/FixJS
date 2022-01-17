function() {

  // Check if the player exists.
  if (this.player) {

    this.addPlayerEvent('abort', function() {
      this.trigger('abort');
    });
    this.addPlayerEvent('loadstart', function() {
      this.onReady();
    });
    this.addPlayerEvent('loadeddata', function() {
      this.onLoaded();
    });
    this.addPlayerEvent('loadedmetadata', function() {
      this.onLoaded();
    });
    this.addPlayerEvent('canplaythrough', function() {
      this.onLoaded();
    });
    this.addPlayerEvent('ended', function() {
      this.onComplete();
    });
    this.addPlayerEvent('pause', function() {
      this.onPaused();
    });
    this.addPlayerEvent('play', function() {
      this.onPlaying();
    });
    this.addPlayerEvent('playing', function() {
      this.onPlaying();
    });

    var errorSent = false;
    this.addPlayerEvent('error', function() {
      if (!errorSent) {
        errorSent = true;
        this.trigger('error', 'An error occured - ' + this.player.error.code);
      }
    });

    this.addPlayerEvent('waiting', function() {
      this.onWaiting();
    });
    this.addPlayerEvent('durationchange', function() {
      this.duration.set(this.player.duration);
      this.trigger('durationchange', {duration: this.player.duration});
    });
    this.addPlayerEvent('progress', function(event) {
      this.bytesTotal.set(event.total);
      this.bytesLoaded.set(event.loaded);
    });
    return true;
  }

  return false;
}