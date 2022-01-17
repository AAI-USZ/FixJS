function () {
    clearBuffers(this._parser);
    this.emit("close");
  }