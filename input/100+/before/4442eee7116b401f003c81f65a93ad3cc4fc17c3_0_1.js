function(key) {
      var result = Agent(target[key], target);

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
    }