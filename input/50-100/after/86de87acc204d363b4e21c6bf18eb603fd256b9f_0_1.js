function toggleWifi() {
    if (settings) {
      settings.getLock().set({'wifi.enabled': this.checked});
    }
  }