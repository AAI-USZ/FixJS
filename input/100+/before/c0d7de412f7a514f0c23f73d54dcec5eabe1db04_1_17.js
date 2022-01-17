function() {
  var ServerError, Vein, eio, isBrowser,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  ServerError = require('./ServerError');

  isBrowser = typeof window !== 'undefined';

  eio = require((isBrowser ? 'node_modules/engine.io-client-f/lib/engine.io-client' : 'engine.io-client-f'));

  Vein = (function(_super) {

    __extends(Vein, _super);

    function Vein(options) {
      var _base, _base1, _base2, _base3, _base4, _base5, _base6, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      this.options = options != null ? options : {};
      this.getId = __bind(this.getId, this);

      this.handleClose = __bind(this.handleClose, this);

      this.handleMessage = __bind(this.handleMessage, this);

      this.handleError = __bind(this.handleError, this);

      this.handleOpen = __bind(this.handleOpen, this);

      this.refresh = __bind(this.refresh, this);

      this.connect = __bind(this.connect, this);

      this.disconnect = __bind(this.disconnect, this);

      this.cookie = __bind(this.cookie, this);

      if (isBrowser) {
        if ((_ref = (_base = this.options).host) == null) {
          _base.host = window.location.hostname;
        }
        if ((_ref1 = (_base1 = this.options).port) == null) {
          _base1.port = (window.location.port.length > 0 ? parseInt(window.location.port) : 80);
        }
        if ((_ref2 = (_base2 = this.options).secure) == null) {
          _base2.secure = window.location.protocol === 'https:';
        }
      }
      if ((_ref3 = (_base3 = this.options).transports) == null) {
        _base3.transports = ["websocket", "polling"];
      }
      if ((_ref4 = (_base4 = this.options).path) == null) {
        _base4.path = '/vein';
      }
      if ((_ref5 = (_base5 = this.options).forceBust) == null) {
        _base5.forceBust = true;
      }
      if ((_ref6 = (_base6 = this.options).debug) == null) {
        _base6.debug = false;
      }
      this.socket = new eio.Socket(this.options);
      this.socket.on('open', this.handleOpen);
      this.socket.on('error', this.handleError);
      this.socket.on('message', this.handleMessage);
      this.socket.on('close', this.handleClose);
      return;
    }

    Vein.prototype.connected = false;

    Vein.prototype.services = null;

    Vein.prototype.cookies = {};

    Vein.prototype.callbacks = {};

    Vein.prototype.cookie = function(key, val, expires) {
      var all, remove, set,
        _this = this;
      if (typeof window !== 'undefined') {
        all = function() {
          var cookie, out, pair, _i, _len, _ref;
          out = {};
          _ref = document.cookie.split(";");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cookie = _ref[_i];
            pair = cookie.split("=");
            if (!(pair[0] && pair[1])) {
              continue;
            }
            out[pair[0].trim()] = pair[1].trim();
          }
          return out;
        };
        set = function(key, val, expires) {
          var sExpires;
          sExpires = "";
          if (typeof expires === 'number') {
            sExpires = "; max-age=" + expires;
          }
          if (typeof expires === 'string') {
            sExpires = "; expires=" + expires;
          }
          if (typeof expires === 'object' ? expires.toGMTString : void 0) {
            sExpires = "; expires=" + (expires.toGMTString());
          }
          document.cookie = "" + (escape(key)) + "=" + (escape(val)) + sExpires;
        };
        remove = function(key) {
          document.cookie = "" + (escape(key)) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
        };
      } else {
        all = function() {
          return _this.cookies;
        };
        set = function(key, val, expires) {
          _this.cookies[key] = val;
        };
        remove = function(key) {
          delete _this.cookies[key];
        };
      }
      if (!key) {
        return all();
      }
      if (key && val === null) {
        return remove(key);
      }
      if (key && !val) {
        return all()[key];
      }
      if (key && val) {
        return set(key, val, expires);
      }
    };

    Vein.prototype.disconnect = function() {
      this.socket.close();
    };

    Vein.prototype.connect = function() {
      this.socket.open();
    };

    Vein.prototype.ready = function(cb) {
      this.on('ready', cb);
      if (this.connected) {
        cb(this.services);
      }
    };

    Vein.prototype.close = function(cb) {
      this.on('close', cb);
      if (!this.connected) {
        cb();
      }
    };

    Vein.prototype.refresh = function(cb) {
      var _this = this;
      this.getSender('__list')(function(services) {
        var name, _i, _len;
        _this.services = services;
        for (_i = 0, _len = services.length; _i < _len; _i++) {
          name = services[_i];
          _this[name] = _this.getSender(name);
        }
        return cb(services);
      });
    };

    Vein.prototype.handleOpen = function() {
      var _this = this;
      this.emit('open');
      this.refresh(function(services) {
        _this.connected = true;
        return _this.emit('ready', services);
      });
    };

    Vein.prototype.handleError = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.emit.apply(this, ['error'].concat(__slice.call(args)));
    };

    Vein.prototype.handleMessage = function(msg) {
      var args, cookies, error, id, service, _base, _ref;
      this.emit('inbound', msg);
      _ref = JSON.parse(msg), id = _ref.id, service = _ref.service, args = _ref.args, error = _ref.error, cookies = _ref.cookies;
      if (!Array.isArray(args)) {
        args = [args];
      }
      if (error != null) {
        throw new ServerError(error);
      }
      if (cookies != null) {
        this.addCookies(cookies);
      }
      if (typeof (_base = this.callbacks)[id] === "function") {
        _base[id].apply(_base, args);
      }
    };

    Vein.prototype.handleClose = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.connected = false;
      this.emit.apply(this, ['close'].concat(__slice.call(args)));
    };

    Vein.prototype.addCookies = function(cookies) {
      var existing, key, val;
      existing = this.cookie();
      for (key in cookies) {
        val = cookies[key];
        if (existing[key] !== val) {
          this.cookie(key, val);
        }
      }
    };

    Vein.prototype.getSender = function(service) {
      var _this = this;
      return function() {
        var args, cb, id, msg, _i;
        args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
        id = _this.getId();
        _this.callbacks[id] = cb;
        msg = JSON.stringify({
          id: id,
          service: service,
          args: args,
          cookies: _this.cookie()
        });
        _this.emit('outbound', msg);
        _this.socket.send(msg);
      };
    };

    Vein.prototype.getId = function() {
      var rand;
      rand = function() {
        return (((1 + Math.random()) * 0x10000000) | 0).toString(16);
      };
      return rand() + rand() + rand();
    };

    return Vein;

  })(eio.EventEmitter);

  if (typeof define === 'function') {
    define(function() {
      return Vein;
    });
  }

  if (isBrowser) {
    window.Vein = Vein;
  }

  module.exports = Vein;

}