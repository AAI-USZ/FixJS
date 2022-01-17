function(time /* in seconds */) {
    if (!this.player || !this.useHtml5Player) { return; }

    if (this.useHtml5Player) {
      this.player.currentTime = time;
    } else {
      // stub for phonegap support
      return;
    }
  }