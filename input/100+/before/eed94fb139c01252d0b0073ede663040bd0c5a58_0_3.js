function() {
  var Channel, ServerChannel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  ServerChannel = require('../lib/Channel');

  Channel = (function(_super) {

    __extends(Channel, _super);

    function Channel(name, socket) {
      this.name = name;
      this.socket = socket;
      this.emit = __bind(this.emit, this);

      this.listeners = [];
      this.events = {};
      this.socket.send(JSON.stringify({
        channel: this.name,
        action: 'join'
      }));
    }

    Channel.prototype.emit = function() {
      var args, event;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.send(JSON.stringify({
        channel: this.name,
        event: event,
        args: args
      }));
      return true;
    };

    return Channel;

  })(ServerChannel);

  module.exports = Channel;

}