function Core() {
  this.networks = {};
  this.log = new log('Core', __dirname + 'core.log');
  this.channel = new CoreChannel(this);

  this.loadNetworks();
}