function(options) {
  var server = {},
      primary = http.createServer(),
      secondary = websprocket.createServer(),
      file = new static.Server("static"),
      meta,
      endpoints = {ws: [], http: []},
      mongo = new mongodb.Server(options["mongo-host"], options["mongo-port"], server_options),
      db = new mongodb.Db(options["mongo-database"], mongo, db_options),
      id = 0;

  secondary.server = primary;

  server.http = primary;
  server.ws = secondary;
  server.mongo = mongo;
  server.db = db;

  var uses = [] //will be used for registrating anything external, particularly endpoints.

  // Register primary WebSocket listener with fallback.
  primary.on("upgrade", function(request, socket, head) {
    if ("sec-websocket-version" in request.headers) {
      request = new websocket.request(socket, request, wsOptions);
      request.readHandshake();
      connect(request.accept(request.requestedProtocols[0], request.origin), request.httpRequest);
    } else if (request.method === "GET"
        && /^websocket$/i.test(request.headers.upgrade)
        && /^upgrade$/i.test(request.headers.connection)) {
      new websprocket.Connection(secondary.manager, secondary.options, request, socket, head);
    }
  });

  // Register secondary WebSocket listener.
  secondary.on("connection", function(connection) {
    connection.socket = connection._socket;
    connection.remoteAddress = connection.socket.remoteAddress;
    connection.sendUTF = connection.send;
    connect(connection, connection._req);
  });

  function connect(connection, request) {

    // Forward messages to the appropriate endpoint, or close the connection.
    for (var i = -1, n = endpoints.ws.length, e; ++i < n;) {
      if ((e = endpoints.ws[i]).match(request.url)) {

        function callback(response) {
          connection.sendUTF(JSON.stringify(response));
        }

        callback.id = ++id;

        // Listen for socket disconnect.
        if (e.dispatch.close) connection.socket.on("end", function() {
          e.dispatch.close(callback);
        });

        connection.on("message", function(message) {
          e.dispatch(JSON.parse(message.utf8Data || message), callback);
        });

        meta({
          type: "cube_request",
          time: Date.now(),
          data: {
            ip: connection.remoteAddress,
            path: request.url,
            method: "WebSocket"
          }
        });

        return;
      }
    }

    connection.close();
  }

  // Register HTTP listener.
  primary.on("request", function(request, response) {
    var u = url.parse(request.url);
//console.log('request:', util.inspect(request, true, 10, true))
    // Forward messages to the appropriate endpoint, or 404.
    for (var i = -1, n = endpoints.http.length, e; ++i < n;) {
      if ((e = endpoints.http[i]).match(u.pathname, request.method)) {

        e.dispatch(request, response);

        meta({
          type: "cube_request",
          time: Date.now(),
          data: {
            ip: request.connection.remoteAddress,
            path: u.pathname,
            method: request.method
          }
        });

        return;
      }
    }

    // If this request wasn't matched, see if there's a static file to serve.
    request.on("end", function() {
      file.serve(request, response, function(error) {
        if (error) {
          response.writeHead(error.status, {"Content-Type": "text/plain"});
          response.end(error.status + "");
        }
      });
    });
  });

  server.use = function(endpointAdder) {
    uses.push(endpointAdder);
    return server;
  }

  server.start = function(callback) {
    // Connect to mongodb.
    util.log("starting mongodb client");
    db.open(function(error) {
      if (error) throw error;
      if (options["mongo-username"] == null) return ready();
      db.authenticate(options["mongo-username"], options["mongo-password"], function(error, success) {
        if (error) throw error;
        if (!success) throw new Error("authentication failed");
        ready();
      });
    });

    // Start the server!
    function ready() {
      uses.forEach(function(adder){adder( db, endpoints)});

      meta = require("./event").putter(db);
      util.log("starting http server on port " + options["http-port"]);

      primary.listen(options["http-port"]);
      if (endpoints.udp) {
        util.log("starting udp server on port " + options["udp-port"]);
        var udp = dgram.createSocket("udp4");
        udp.on("message", function(message) {
          endpoints.udp(JSON.parse(message.toString("utf8")), ignore);
        });
        udp.bind(options["udp-port"]);
      }
      (callback || ignore)();
    }
  };

  return server;
}