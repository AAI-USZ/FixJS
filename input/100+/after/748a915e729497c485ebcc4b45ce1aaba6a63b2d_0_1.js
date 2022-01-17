function dispatch(){
    this.status    || (this.status = 200);
    this.mimetype  || (this.mimetype = 'text/plain');
    this.data      || (this.data = EMPTY);
    this.responseCode = statusCodes[this.status];

    if (!Buffer.isBuffer(this.data)) {
      if (this.data !== null && typeof this.data === 'object') {
        this.mimetype = 'application/json';
        this.data = new Buffer(JSON.stringify(this.data));
      } else if (typeof this.data === 'string' || typeof this.data === 'number') {
        this.data = new Buffer(this.data);
      } else {
        this.data = EMPTY;
      }
    }

    this.callback(this.status, this.responseCode, this.mimetype, this.data);
  }