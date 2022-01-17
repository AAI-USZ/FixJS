function() {
  // Stop the intervals.
  this.playing = false;
  this.loading = false;
  this.hasFocus = false;
  this.trigger('ended');
}