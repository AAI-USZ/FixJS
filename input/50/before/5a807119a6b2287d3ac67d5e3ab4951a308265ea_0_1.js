function isChanged(vv) {
    maybeChange(vv);
    return vv.lastChanged === timestamp;
  }