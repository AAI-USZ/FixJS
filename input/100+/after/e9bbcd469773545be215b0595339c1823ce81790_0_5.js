function() {
      var args, bits, c, cb, config, container, k, namespace, ns, options, optionsArray, that, varName, vs, _i, _len, _ref3, _ref4, _ref5, _ref6;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref3 = MITHGrid.normalizeArgs.apply(MITHGrid, args), namespace = _ref3[0], container = _ref3[1], config = _ref3[2], cb = _ref3[3];
      that = {
        _mithgrid_type: "MITHGrid"
      };
      optionsArray = [];
      if (namespace != null) {
        if (typeof namespace === "string") namespace = [namespace];
        that._mithgrid_type = namespace[0];
        namespace.reverse();
        for (_i = 0, _len = namespace.length; _i < _len; _i++) {
          ns = namespace[_i];
          bits = ns.split('.');
          ns = bits.shift();
          if (MITHGridDefaults[ns] != null) {
            optionsArray.push(MITHGridDefaults[ns]);
          }
          while (bits.length > 0) {
            ns = ns + "." + bits.shift();
            if (MITHGridDefaults[ns] != null) {
              optionsArray.push(MITHGridDefaults[ns]);
            }
          }
        }
      }
      if (config != null) optionsArray.push(config);
      options = $.extend.apply($, [true, {}].concat(__slice.call(optionsArray)));
      initViewCounter += 1;
      that.id = initViewCounter;
      that.options = options;
      that.container = container;
      that.events = {};
      if (that.options.events != null) {
        _ref4 = that.options.events;
        for (k in _ref4) {
          c = _ref4[k];
          if (c != null) {
            if (typeof c === "string") c = [c];
          } else {
            c = [];
          }
          that.events[k] = MITHGrid.initEventFirer((__indexOf.call(c, "preventable") >= 0), (__indexOf.call(c, "unicast") >= 0), (__indexOf.call(c, "memory") >= 0));
        }
      }
      that.addVariable = function(varName, config) {
        var eventName, filter, getName, lockName, locked, oldSetter, setName, setter, unlockName, validate, value;
        value = config["default"];
        config.is || (config.is = 'rw');
        if (__indexOf.call(config.is, 'w') >= 0) {
          filter = config.filter;
          validate = config.validate;
          eventName = config.event || ('on' + varName + 'Change');
          setName = config.setter || ('set' + varName);
          lockName = config.locker || ('lock' + varName);
          unlockName = config.unlocker || ('unlock' + varName);
          that.events[eventName] = MITHGrid.initEventFirer();
          if (filter != null) {
            if (validate != null) {
              setter = function(v) {
                v = validate(filter(v));
                if (value !== v) {
                  value = v;
                  return that.events[eventName].fire(value);
                }
              };
            } else {
              setter = function(v) {
                v = filter(v);
                if (value !== v) {
                  value = v;
                  return that.events[eventName].fire(value);
                }
              };
            }
          } else {
            if (validate != null) {
              setter = function(v) {
                v = validate(v);
                if (value !== v) {
                  value = v;
                  return that.events[eventName].fire(value);
                }
              };
            } else {
              setter = function(v) {
                if (value !== v) {
                  value = v;
                  return that.events[eventName].fire(value);
                }
              };
            }
          }
          if (__indexOf.call(config.is, 'l') >= 0) {
            locked = 0;
            that[lockName] = function() {
              return locked += 1;
            };
            that[unlockName] = function() {
              return locked -= 1;
            };
            oldSetter = setter;
            setter = function(v) {
              if (locked === 0) return oldSetter(v);
            };
          }
          that[setName] = setter;
        }
        if (__indexOf.call(config.is, 'r') >= 0) {
          getName = config.getter || ('get' + varName);
          return that[getName] = function() {
            return value;
          };
        }
      };
      if (((_ref5 = that.options) != null ? _ref5.variables : void 0) != null) {
        _ref6 = options.variables;
        for (varName in _ref6) {
          config = _ref6[varName];
          that.addVariable(varName, config);
        }
      }
      if (((options != null ? options.viewSetup : void 0) != null) && (container != null)) {
        vs = options.viewSetup;
        if ($.isFunction(vs)) {
          $(document).ready(function() {
            return vs($(container));
          });
        } else {
          $(document).ready(function() {
            return $(container).append(vs);
          });
        }
      }
      if (cb != null) cb(that, container);
      return that;
    }