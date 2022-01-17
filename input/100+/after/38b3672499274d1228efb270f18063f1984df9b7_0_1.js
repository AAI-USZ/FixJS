function changeBT() {
    if (settings) {
      settings.getLock().set({
        'bluetooth.enabled': this.checked
      });
    }
  }