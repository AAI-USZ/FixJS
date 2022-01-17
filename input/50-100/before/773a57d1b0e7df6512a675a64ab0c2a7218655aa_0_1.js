function checkState() {
    if (released) throw new Error('Connection is no longer available');
  }