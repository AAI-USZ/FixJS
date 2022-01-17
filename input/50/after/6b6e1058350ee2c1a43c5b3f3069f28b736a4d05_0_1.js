function (bytes, context) {
    if (!bytes.length)
      throw ArgumentError();

    this._load(bytes);
  }