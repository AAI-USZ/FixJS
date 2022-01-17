function JSONP (req) {
  Polling.call(this, req);

  this.head = '___eio[' + req.query.j + '](';
  this.foot = ');';
}