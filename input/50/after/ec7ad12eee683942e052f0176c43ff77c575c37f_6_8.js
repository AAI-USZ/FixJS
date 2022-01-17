function pg_getLastIcon() {
    var lastIcon = this.olist.lastChild;
    if (lastIcon) {
      lastIcon = this.icons[lastIcon.dataset.origin];
    }
    return lastIcon;
  }