function connect(port, options, callback) {
    if (!checkType([
      "port", port, "number",
      "options", options, "object"
    ], callback)) return;

    var retries = options.hasOwnProperty('retries') ? options.retries : 5;
    var retryDelay = options.hasOwnProperty('retryDelay') ? options.retryDelay : 50;
    tryConnect();
    function tryConnect() {
      var socket = net.connect(port, function () {
        if (options.hasOwnProperty('encoding')) {
          socket.setEncoding(options.encoding);
        }
        callback(null, {stream:socket});
      });
      socket.once("error", function (err) {
        if (err.code === "ECONNREFUSED" && retries) {
          setTimeout(tryConnect, retryDelay);
          retries--;
          retryDelay *= 2;
          return;
        }
        return callback(err);
      });
    }
  }