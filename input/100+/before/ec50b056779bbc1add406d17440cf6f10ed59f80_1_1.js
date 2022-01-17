function Channel(network, name) {
  var chan = this;
  chan.allowedEvents = ['join', 'part', '+mode', '-mode', 'pm'];
  chan.path = process.cwd() + '/' + name.toLowerCase() + '/';
  chan.modulePath = __dirname + '/modules/';
  chan.log = new log(name, chan.path + 'channel.log');
  chan.isCore = false;
  chan.network = network;
  chan.name = name;
  chan.config = {};
  chan.operators = [];
  chan.commands = [];
  chan.routes = [];
  chan.modules = {};
  chan.overrides = {};
  chan.io = {
    isOP: function (host) { return chan.isOperator(host); },
    kick: function (who, reason) { chan.network.send('KICK', chan.name, who, reason); }
  };
}