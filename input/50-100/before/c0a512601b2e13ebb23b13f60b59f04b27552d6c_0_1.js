function DbError(msg, code){
  this.name = 'DbError';
  if (typeof(msg) === 'string') {
    this.message = msg;
  } else {
    this.data = msg;
    this.message = 'custom';
  }
  this.code = code || 500;
  Error.call(this, msg);
}