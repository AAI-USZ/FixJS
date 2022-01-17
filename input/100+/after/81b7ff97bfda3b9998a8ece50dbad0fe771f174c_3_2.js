function dispatch(){
    console.log(this);
    this.status    || (this.status = 200);
    this.mimetype  || (this.mimetype = 'text/plain');
    this.data      || (this.data = EMPTY);
    this.responseCode = statusCodes[this.status];

    if (this.data && typeof this.data === 'object' && !Buffer.isBuffer(this.data)) {
      this.mimetype = 'application/json';
      this.data = new Buffer(JSON.stringify(this.data));
    }

    if(!Buffer.isBuffer(this.data)) {
      this.data = new Buffer(this.data);
    }


    this.callback(this.status, this.responseCode, this.mimetype, this.data);
  }