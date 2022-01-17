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
      functions = require(options.file);
    }

    // User can pass in code as a pre-buffered string
    else if (options.code) {
      functions = evaluate(options.code);
    }

    // Or we'll give them a writable stream to pipe it to.
    else {
      var stream = meta.stream = new MemStream();
      stream.on("done", function (code) {
        functions = evaluate(code);
        api.emit("ready");
      });
    }

    return callback(null, meta);

  }