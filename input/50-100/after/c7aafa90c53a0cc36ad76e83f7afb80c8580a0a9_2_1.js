function() {
    if (!this.player) { return; }

    if (this.useHtml5Player) {
      return this.player.currentTime;
    } else {
      return dojo.when(this.player.getCurrentPosition(), function(position) { return position; });
    }
  }