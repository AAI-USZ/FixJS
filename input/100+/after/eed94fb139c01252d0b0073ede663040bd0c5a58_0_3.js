function() {
  var Channel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Channel = (function() {

    function Channel(name, socket) {
      this.name = name;
      this.socket = socket;
      this.removeAllListeners = __bind(this.removeAllListeners, this);

      this.removeListener = __bind(this.removeListener, this);

      this.once = __bind(this.once, this);

      this.addListener = __bind(this.addListener, this);

      this.emit = __bind(this.emit, this);

      this.realEmit = __bind(this.realEmit, this);

      this.listeners = [];
      this.events = {};
      this.socket.send(JSON.stringify({
        channel: this.name,
        action: 'join'
      }));
    }

    Channel.prototype.realEmit = function() {
      var args, event, l, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.events[event]) {
        return false;
      }
      _ref = this.events[event];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        l.apply(null, args);
      }
      return true;
    };

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

    Channel.prototype.addListener = function(event, listener) {
      var _base, _ref;
      this.realEmit('newListener', event, listener);
      ((_ref = (_base = this.events)[event]) != null ? _ref : _base[event] = []).push(listener);
      return this;
    };

    Channel.prototype.on = Channel.prototype.addListener;

    Channel.prototype.once = function(event, listener) {
      var fn,
        _this = this;
      fn = function() {
        _this.removeListener(event, fn);
        return listener.apply(null, arguments);
      };
      this.on(event, fn);
      return this;
    };

    Channel.prototype.removeListener = function(event, listener) {
      var l;
      if (!this.events[event]) {
        return this;
      }
      this.events[event] = (function() {
        var _i, _len, _ref, _results;
        _ref = this.events[event];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          l = _ref[_i];
          if (l !== listener) {
            _results.push(l);
          }
        }
        return _results;
      }).call(this);
      return this;
    };

    Channel.prototype.removeAllListeners = function(event) {
      delete this.events[event];
      return this;
    };

    return Channel;

  })();

  module.exports = Channel;

}