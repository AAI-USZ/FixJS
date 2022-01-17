function() {
      var args, callback, command, gen, generator, _i;
      generator = arguments[0], args = 4 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 2) : (_i = 1, []), command = arguments[_i++], callback = arguments[_i++];
      if (typeof generator === "object") {
        return f.help.apply(null, arguments) && (typeof callback === "function" ? callback() : void 0);
      }
      if (args.length === 0) {
        if (typeof command !== "object") {
          args.push(command);
        }
      } else if (typeof callback !== "function") {
        args.push(command) && (command = callback);
      }
      if (!(generator in generators)) {
        return error(missing("Generator " + generator));
        if (typeof callback === "function") {
          callback();
        }
      }
      gen = generators[generator];
      if (typeof gen !== "function") {
        return error("Generators must be a function, was " + (typeof gen));
        if (typeof callback === "function") {
          callback();
        }
      }
      return gen.apply(null, [generator].concat(args).concat(callback));
    }