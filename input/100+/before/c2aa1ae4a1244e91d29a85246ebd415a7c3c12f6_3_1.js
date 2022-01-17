function(args) {
  Object.defineProperty(this, '_model', {value: args.model});
  
  extend(args.data, this);
  if (!this.key) this.key = uuid();
  
  hash = crypto.createHash('sha1');
  hash.update(JSON.stringify(this));
  Object.defineProperty(this, '_original', {value: hash.digest('base64')});
}