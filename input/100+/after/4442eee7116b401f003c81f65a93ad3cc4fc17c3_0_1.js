function(target, thisArg) {
  var ret;

  if (Array.isArray(target)) {
    ret = null;
  } else if (utils.type.isFunction(target)) {
    ret = function() {
      target.apply(thisArg, arguments);
      ret.emit("bubble", { type: "msg", keypath: [], args: Array.prototype.slice.call(arguments) });
    };
  } else if (utils.type.isNumber(target) || utils.type.isString(target)) {
    ret = null;
  } else {
    ret = {};
  }

  if (ret) {
    ret.__proto__ = Object.create(EventEmitter.prototype);
    
    Object.keys(target).forEach(function(key) {
      var result = Agent(target[key], ret);

      if (result) {
        result.on("bubble", function(cmd) {
          ret.emit("bubble", { type: cmd.type, keypath: [key].concat(cmd.keypath), args: cmd.args });
        });

        ret[key] = result;
      } else {
        Object.defineProperty(
          ret,
          key,
          {
            enumerable: true,
            get: function() {
              ret.emit("bubble", { type: "get", keypath: [key], args : [] });
              return target[key];
            },
            set: function(value) {
              target[key] = value;
              ret.emit("bubble", { type: "set", keypath: [key], args: [value] });
            }
          }
        );
      }
    });

    ret.exec = function(cmd) {
      exec(target, cmd);
    };
  }

  return ret;
}