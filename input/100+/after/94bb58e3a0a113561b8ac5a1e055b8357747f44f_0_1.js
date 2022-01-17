function(_request, _response) {
    var MONGO_DB = _request.query['connection-string'];
    // test for attempts to access localhost on mongoview.com
    isMongoViewLive = /mongoview\.com/i.test(_request.headers.host);
    isMongoDBLocalhost = /localhost/i.test(MONGO_DB);
    if (isMongoViewLive && isMongoDBLocalhost) {
      _response.send(new Error('no_access', 511));
    } else {
      // get database name from conection string
      var db_name = MONGO_DB.split('/')[3];
      // create the mongodb client
      var _client = mongodb.connect(MONGO_DB, function(_error, _db) {
        if (_error) {
          _response.send(_error);
        } else {
          db = _db;
          client = _client;
          _request.session.connected = true;
          _request.session.MONGO_DB = MONGO_DB;
          _response.send({
            db_name : db_name
          });
        };
      });
    };
  }