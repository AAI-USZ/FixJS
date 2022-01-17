function ready(callback) {
      uses.forEach(function(adder){adder( db, endpoints)});
console.log('endpoints',util.inspect(endpoints, true, 10, true))
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