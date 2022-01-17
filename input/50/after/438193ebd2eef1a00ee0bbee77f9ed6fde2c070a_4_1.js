function() {
  if (this.playing) {
    this.onPaused();
  }

  // Stop the intervals.
  this.playing = false;
  this.loading = false;
  this.hasFocus = false;
  this.trigger('ended');
}