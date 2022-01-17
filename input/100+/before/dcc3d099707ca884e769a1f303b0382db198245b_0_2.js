function () {
    var server_callback = function (req, res) {
      try {
        hummingbird.serveRequest(req, res);
      } catch (e) {
        hummingbird.handleError(req, res, e);
      }
    },
      server;

    if (config.https) {
      server = http.createServer(server_callback);
    }
    else {
      server = https.createServer({'key': config.https_key, 'cert': config.https_cert},server_callback);
    }
    
    if (config.tracking_ip) {
      server.listen(config.tracking_port,config.tracking_ip);
    }
    else {
      server.listen(config.tracking_port);
    }
    console.log('Tracking server running at http'+(config.https? 's' : '')+'://'+(config.tracking_ip || '*')+':'+config.tracking_port+'/tracking_pixel.gif');

    if (config.enable_dashboard) {
      var file = new(node_static.Server)('./public');

      var dashboardServer_callback = function (request, response) {
        request.addListener('end', function () {
          file.serve(request, response);
        });
      };

      var dashboardServer;

      if (config.https) {
        dashboardServer = http.createServer(dashboardServer_callback);
      }
      else {
        dashboardServer = https.createServer({'key': config.https_key, 'cert': config.https_cert},dashboardServer_callback);
      }

      dashboardServer.listen(config.dashboard_port);
      console.log('Dashboard server running at http'+(config.https? 's' : '')+'://*:'+config.dashboard_port);

      console.log('Web Socket server running at ws://*:'+config.dashboard_port);
    } 
    else {
      console.log('Web Socket server running at ws://*:'+config.tracking_port);
    }
    
    var io = sio.listen(dashboardServer || server);

    io.set('log level', 2);

    hummingbird.io = io;
    hummingbird.addAllMetrics(io, db);

    if (config.udp_address) {
      var udpServer = dgram.createSocket("udp4");

      udpServer.on("message", function (message, rinfo) {
        console.log("message from " + rinfo.address + " : " + rinfo.port);

        var data = JSON.parse(message);
        hummingbird.insertData(data);
      });

      udpServer.bind(config.udp_port, config.udp_address);

      console.log('UDP server running on UDP port ' + config.udp_port);
    }
  }