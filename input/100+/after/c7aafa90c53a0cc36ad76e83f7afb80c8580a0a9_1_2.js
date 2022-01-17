function(media) {
    this.inherited(arguments);
    this.set('isPlaying', true);
    if (this.useHtml5Player) { return; }
   
    if (!this.isPaused || (this.isPaused && !!media)) {
      alert('play new song');
      this.player.play(this.media.url);
    } else if(this.isPaused && !media){
      this.set('isPaused', false);
      alert('unpause song');
      this.player.play();
    } else

    this._updateSpinner();
  }