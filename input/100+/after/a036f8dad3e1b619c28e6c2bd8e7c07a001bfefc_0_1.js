function (options, appId, destination, main_cb) {
    if(!destination) destination = 'all';
    // helper func for async
    function listForDestination(d, cb) {
      var payload = {
        payload: {
          "template": appId,
          destination: d
        }
      };
      api.doConfigCall(options, "list", payload, "Error listing destination config: ", cb); 
    }

    if(destination === "all") {
      async.map(destinations, listForDestination, function (err, results){
        if (err) return main_cb(err, null);
        var data = {};
        for (var i = 0; i < results.length; i++) {
          data[destinations[i]] = results[i];
        }
        return main_cb(null, data);
      });
    } else {
      listForDestination(destination, main_cb);
    }
  }