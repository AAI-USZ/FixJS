function IncomingForm(opts) {
  if (!(this instanceof IncomingForm)) return new IncomingForm(opts);
  EventEmitter.call(this);

  opts=opts||{};

  this.error = null;
  this.ended = false;

  this.maxFieldsSize = opts.maxFieldsSize || 2 * 1024 * 1024;
  this.keepExtensions = opts.keepExtensions || false;
  this.uploadDir = opts.uploadDir || IncomingForm.UPLOAD_DIR;
  this.encoding = opts.encoding || 'utf-8';
  this.headers = null;
  this.type = null;
  this.hash = false;

  this.bytesReceived = null;
  this.bytesExpected = null;

  this._parser = null;
  this._flushing = 0;
  this._fieldsSize = 0;
  return this;
}