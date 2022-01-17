function(config, options) {
  options = options || {};
  var client = new Client(config, options);
  client.connect();
  this.Base = new Base(client);
  this.client = client;
  this.options = options;
  return this;
}