function Channel(network, name) {
  this.allowedEvents = ['join', 'part', '+mode', '-mode', 'pm'];
  this.path = process.cwd() + '/' + name.toLowerCase() + '/';
  this.modulePath = __dirname + '/modules/';
  this.log = new log(name, this.path + 'channel.log');
  this.isCore = false;
  this.network = network;
  this.name = name;
  this.config = {};
  this.operators = [];
  this.commands = [];
  this.routes = [];
  this.modules = {};
  this.overrides = {};
  this.io = {};
}