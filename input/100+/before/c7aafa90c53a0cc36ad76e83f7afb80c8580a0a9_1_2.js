function() {
    this.inherited(arguments);
    this.set('isPlaying', true);

    if (this.useHtml5Player) { return; }
   
    if (!this.isPaused) {
      this.player.play(this.media.url);
    } else {
      this.set('isPaused',false);
      this.player.play();
    }

    this._updateSpinner();
  }