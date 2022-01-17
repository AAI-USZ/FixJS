function(_request, _response) {
    var MONGO_DB = _request.query['connection-string'];
    var db_name = MONGO_DB.split('/')[3];
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
  }