function() {
  var config = this.config;
  //added port to connection
  this.client = mysql.createConnectionSync(config.host, config.user, config.password, config.database, config.port);
  //this.client = mysql.createConnectionSync(config.host, config.user, config.password, config.database);
  //this.client = mysql.createConnectionSync(config.host, config.user, config.password);
  if (config.database) {
    this.client.query('USE '+config.database);
  }
  if (!this.client) throw new Error('Could not connect with this configuration.', config);
  return this.connected = true;
}