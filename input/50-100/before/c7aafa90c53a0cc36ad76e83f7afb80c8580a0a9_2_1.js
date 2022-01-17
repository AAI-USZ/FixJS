function() {
    if (!this.player) { return; }

    var currentTime;

    if (this.useHtml5Player) {
      currentTime = this.player.currentTime;
    } else {
      currentTime = dojo.when(this.player.getCurrentPosition(), function(position) { return position; });
    }

    return currentTime;
  }