function maybeTouch(vv) {
    if (!evaluator.isUpdating()) {
      touch(vv);
    }
  }