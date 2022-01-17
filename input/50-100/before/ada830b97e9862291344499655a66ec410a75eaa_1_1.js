function (str) {
    if (!this._options.color) return this._write(str);
    if (before) before.call(this);

    this._write(str);
    this.cursor.reset();
    return this;
  }