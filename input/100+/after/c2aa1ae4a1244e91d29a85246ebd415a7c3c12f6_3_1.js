function(args) {
  Object.defineProperty(this, '_model', {value: args.model});
  
  extend(args.data, this);
  if (!this.key) Object.defineProperty(this, 'key', {value: uuid()});
  
  var hash = crypto.createHash('sha1');
  hash.update(JSON.stringify(this));
  var digest = hash.digest('base64');
  
  Object.defineProperty(this, '_original', {value: digest});
  console.log(this);
}