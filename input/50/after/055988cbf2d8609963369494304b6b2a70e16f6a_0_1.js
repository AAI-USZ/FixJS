function Resources(connection, options) {
    Propfind.apply(this, arguments);

    this._resources = {};
    this.depth = 1;
  }