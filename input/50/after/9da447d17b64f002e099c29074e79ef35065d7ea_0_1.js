function (v) {
    if (v instanceof Error) {
      callback(v);
    } else {
      callback(null, v);
    }
  }