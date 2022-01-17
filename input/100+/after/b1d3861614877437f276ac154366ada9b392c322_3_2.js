function(url, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = typeof args[args.length - 1] == 'function' ? args.pop() : null;
  options = args.length ? args.shift() : null;
  options = options || {};
  var serverOptions = options.server || {};
  var replSetServersOptions = options.replSet || options.replSetServers || {};
  var dbOptions = options.db || {};

  // Ensure empty socket option field
  serverOptions.socketOptions = serverOptions.socketOptions || {};
  replSetServersOptions.socketOptions = serverOptions.socketOptions || {};

  // Match the url format
  var urlRE = new RegExp('^mongo(?:db)?://(?:|([^@/]*)@)([^@/]*)(?:|/([^?]*)(?:|\\?([^?]*)))$');
  var match = (url || Db.DEFAULT_URL).match(urlRE);
  if (!match)
    throw Error("URL must be in the format mongodb://user:pass@host:port/dbname");

  var authPart = match[1] || '';
  var auth = authPart.split(':', 2);
  if(options['uri_decode_auth']){
    auth[0] = decodeURIComponent(auth[0]);
    if(auth[1]){
      auth[1] = decodeURIComponent(auth[1]);
    }
  }

  var hostPart = match[2];
  var dbname = match[3] || 'default';
  var urlOptions = (match[4] || '').split(/[&;]/);

  // Ugh, we have to figure out which options go to which constructor manually.
  urlOptions.forEach(function(opt) {
    if(!opt) return;
    var splitOpt = opt.split('='), name = splitOpt[0], value = splitOpt[1];

    // Options implementations
    switch(name) {
      case 'slaveOk':
      case 'slave_ok':  
        serverOptions.slave_ok = (value == 'true');
        break;
      case 'poolSize':
        serverOptions.poolSize = Number(value);
        break;
      case 'autoReconnect':
      case 'auto_reconnect':
        serverOptions.auto_reconnect = (value == 'true');
        break;
      case 'ssl':
        serverOptions.ssl = (value == 'true');
        break;
      case 'replicaSet':
      case 'rs_name':
        replSetServersOptions.rs_name = value;
        break;
      case 'reconnectWait':
        replSetServersOptions.reconnectWait = Number(value);
        break;
      case 'retries':
        replSetServersOptions.retries = Number(value);
        break;
      case 'readSecondary':
      case 'read_secondary':
        replSetServersOptions.retries = Number(value);
        break;
      case 'safe':
        dbOptions.safe = (value == 'true');
        break;
      case 'nativeParser':
      case 'native_parser':
        dbOptions.native_parser = (value == 'true');
        break;
      case 'strict':
        dbOptions.strict = (value == 'true');
        break;
      case 'connectTimeoutMS':
        serverOptions.socketOptions.connectTimeoutMS = Number(value);
        replSetServersOptions.socketOptions.connectTimeoutMS = Number(value);
        break;
      case 'socketTimeoutMS':
        serverOptions.socketOptions.socketTimeoutMS = Number(value);
        replSetServersOptions.socketOptions.socketTimeoutMS = Number(value);
        break;
      default:
        break;
    }
  });

  var servers = hostPart.split(',').map(function(h) {
    var hostPort = h.split(':', 2);
    return new Server(hostPort[0] || 'localhost', hostPort[1] != null ? parseInt(hostPort[1]) : 27017, serverOptions);
  });

  var server;
  if (servers.length == 1) {
    server = servers[0];
  } else {
    server = new ReplSet(servers, replSetServersOptions);
  }

  var db = new Db(dbname, server, dbOptions);
  if(options.noOpen)
    return db;
    
  // If callback is null throw an exception
  if(callback == null) throw new Error("no callback function provided");

  db.open(function(err, db){
    if(err == null && authPart){
      db.authenticate(auth[0], auth[1], function(err, success){
        if(success){
          callback(null, db);
        } else {
          callback(err ? err : new Error('Could not authenticate user ' + auth[0]), db);
        }
      });
    } else {
      callback(err, db);
    }
  });
}