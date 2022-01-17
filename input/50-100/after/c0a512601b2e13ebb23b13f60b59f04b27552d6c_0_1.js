function DbError(msg, code){
  this.name = 'DbError';
  if (typeof(msg) === 'string') {
    this.message = msg;
  } else {
    this.data = msg;
    this.message = 'custom';
  }
  this.code = code || 504;
  Error.call(this, msg);
}