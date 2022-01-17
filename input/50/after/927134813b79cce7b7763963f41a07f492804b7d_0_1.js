function JSONP (req) {
  Polling.call(this, req);

  this.head = '___eio[' + (req.query.j || '').replace(/[^0-9]/g, '') + '](';
  this.foot = ');';
}