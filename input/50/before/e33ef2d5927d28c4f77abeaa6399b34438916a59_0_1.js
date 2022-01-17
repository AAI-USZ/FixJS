function() {
    if (!this.player) { return; }

    if (this.useHtml5Player) {
      return this.player.duration;
    } else {
      // stub for phonegap support
      return;
    }
  }