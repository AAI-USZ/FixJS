function extend(name, options, callback) {
    if (!checkType([
      "name", name, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    // Pull from cache if it's already loaded.
    if (apis.hasOwnProperty(name)) {
      meta.api = apis[name];
      return callback(null, meta);
    }

    var api = apis[name] = meta.api = new EventEmitter();
    api.name = name;
    api.names = options.names;
    var functions; // Will contain the compiled code as functions

    // Create proxy functions.
    options.names.forEach(function (name) {
      api[name] = function () {
        if (!functions) {
          return api.emit("error", new Error("Missing API functions"));
        }
        if (!functions.hasOwnProperty(name)) {
          return api.emit("error", new Error("Missing API function: " + name));
        }
        return functions[name].apply(this, arguments);
      };
    });

    // The user can pass in a path to a file to require
    if (options.file) {
      var fn;
      try {
        fn = require(options.file);
      } catch (err) {
        return callback(err);
      }
      fn(vfs, onEvaluate);
    }

    // User can pass in code as a pre-buffered string
    else if (options.code) {
      var fn;
      try {
        fn = evaluate(options.code);
      } catch (err) {
        return callback(err);
      }
      fn(vfs, onEvaluate);
    }

    // Or we'll give them a writable stream to pipe it to.
    else {
      var stream = meta.stream = new MemStream();
      stream.on("done", function (code) {
        var fn;
        try {
          fn = evaluate(code);
        } catch(err) {
          console.error(err.stack);
          api.emit("error", err);
          return;
        }
        fn(vfs, onEvaluate);
      });
    }

    return callback(null, meta);

    function onEvaluate(err, exports) {
      if (err) {
        api.emit("error", err);
        return;
      }
      functions = exports;
      try {
        api.emit("ready");
      } catch (err) {
        api.emit("error", err);
      }
    }

  }