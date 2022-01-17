function isChanged(vv) {
    maybeSet(vv);
    return vv.lastChanged === timestamp;
  }