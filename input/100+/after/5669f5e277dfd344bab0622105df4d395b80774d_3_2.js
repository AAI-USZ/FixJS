function(callback){
  var self = this;
  var defaultServerOptions = {auto_reconnect: true};
  
  if(self.listening){
    if(typeof(callback)=='function') callback(null, self);
  }else{  
    var open = function(p_db, mqDB, collectionSize){
      openQueue(p_db, mqDB, collectionSize, function(err, collection){
        self.collection = collection;
        self.listening = true;
        if(self.listeners.length){
          var l = self.listeners.length;
          for(i = 0; i<l; i++){
            self.listeners[i].start();
          }
        }
        if(typeof(callback)=='function') callback(null, self);
      });
    };
    
    options = self.options;
    if(options.servers instanceof Array){
      var servers = [], host, port, serverOptions, l = options.servers.length;
      for(var i = 0; i<l; i++){
        if(typeof(options.servers[i])=='string'){
          host = options.servers[i];
          port = mongodb.Connection.DEFAULT_PORT;
          serverOptions = options.serverOptions||defaultServerOptions;
        }else{
          host = options.servers[i].host||options.host||'localhost';
          port = options.servers[i].port||options.port||mongodb.Connection.DEFAULT_PORT;
          serverOptions = options.servers[i].serverOptions||options.serverOptions||defaultServerOptions;
        }
        servers.push(new mongodb.Server(host, port, options));
      }
      self.server = new mongodb.ReplSetServers(servers);
    }else self.server = new mongodb.Server(options.host||'localhost', options.port||mongodb.Connection.DEFAULT_PORT, options.serverOptions||defaultServerOptions);
    var db = self.dbConnection = new mongodb.Db(options.db, self.server, options.dbOptions||{native_parser:(options.nativeParser==null?false:options.nativeParser)});
    db.open(function(err, p_db){
      self.p_db = p_db;
      if(options.username&&options.password){
        db.admin(function(err, adminDb){
          adminDb.authenticate(options.username, options.password, function(err, result){
            if(result){
              open(p_db, self.mqDB, self.collectionSize);
            }else{
              self.p_db.close();
              delete self.p_db;
              self.listening = false;
            }
          });
        });
      }else{
        open(p_db, self.mqDB, self.collectionSize);
      }
    });
  }
}