function() {
    if (!this.player || !this.useHtml5Player) { return; }

    return this.player.duration;
  }