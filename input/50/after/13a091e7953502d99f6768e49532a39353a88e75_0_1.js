function(full) {
    if (full == null) full = true;
    if (full) {
      arrwrite(REAVETARD_TITLE, true);
    } else {
      arrwrite(REAVETARD_TITLE_S, true);
    }
    return this;
  }