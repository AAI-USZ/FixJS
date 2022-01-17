function pg_popIcon() {
    var icon = this.getLastIcon();
    this.remove(icon);
    return icon;
  }