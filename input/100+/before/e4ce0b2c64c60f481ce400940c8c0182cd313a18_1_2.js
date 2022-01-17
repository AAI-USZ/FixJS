function(files) {

  // Set the id and class.
  var id = '', pClass = '';

  // If no file was provided, then get it.
  this.options.files = files || this.options.files;
  this.options.file = minplayer.getMediaFile(this.options.files);

  // Now load the player.
  if (this.loadPlayer()) {

    // Add the events since we now have a player.
    this.addEvents();

    // If the player isn't valid, then show an error.
    if (this.options.file.mimetype && !this.options.file.player) {
      this.showError('Cannot play media: ' + this.options.file.mimetype);
    }
  }
}