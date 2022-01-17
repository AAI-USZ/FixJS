function() {
    if (!this._swfVersion)
      throw Error();

    return this._swfVersion;
  }