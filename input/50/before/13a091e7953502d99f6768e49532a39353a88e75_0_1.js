function(full) {
    if (full == null) full = true;
    if (full) {
      arrwrite(REAVETARD_TITLE, false);
    } else {
      arrwrite(REAVETARD_TITLE_S, false);
    }
    return this;
  }