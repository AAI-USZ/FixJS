function send(status, mimetype, data){
    if (arguments.length === 1) {
      if (typeof status === 'number') {
        this.status = status;
      } else {
        this.mimetype = 'text/html';
        this.data = status;
      }
    } else if (arguments.length === 2){
      this.status = status;
      this.data = Buffer.isBuffer(mimetype) ? mimetype : new Buffer(mimetype);
    } else {
      this.status = status;
      this.mimetype = mimetype;
      this.data = Buffer.isBuffer(data) ? data : new Buffer(data);
    }

    this.dispatch();
  }