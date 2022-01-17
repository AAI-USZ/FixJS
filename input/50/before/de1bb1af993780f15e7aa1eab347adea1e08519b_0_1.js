function() {
    return Math.max(-1, this.sendAt().getTime() - Date.now());
  }