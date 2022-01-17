function am_setEnabled(alarm, enabled) {
    if (enabled) {
      this.set(alarm);
    } else {
      this.unset(alarm);
    }
  }