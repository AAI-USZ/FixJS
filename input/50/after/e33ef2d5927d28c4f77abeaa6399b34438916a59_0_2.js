function(time /* in seconds */) {
    if (!this.player || !this.useHtml5Player) { return; }

    this.player.currentTime = time;
  }