function Channel(network, name) {
  this.allowedEvents = ['join', 'part', '+mode', '-mode'];
  this.path = process.cwd() + '/' + name + '/';
  this.modulePath = __dirname + '/modules/';
  this.isCore = false;
  this.network = network;
  this.name = name;
  this.config = {};
  this.operators = [];
  this.commands = this.routes = [];
  this.modules = this.overrides = {};
  this.io = {};
}