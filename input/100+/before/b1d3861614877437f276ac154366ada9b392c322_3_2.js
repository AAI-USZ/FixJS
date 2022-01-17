function(url, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = typeof args[args.length - 1] == 'function' ? args.pop() : null;
  options = args.length ? args.shift() : null;
  options = options || {};
  var serverOptions = options.server || {};
  var replSetServersOptions = options.replSet || options.replSetServers || {};
  var dbOptions = options.db || {};

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
    if (!opt) return;
    var splitOpt = opt.split('='), name = splitOpt[0], value = splitOpt[1];

    // Server options:
    if (name == 'slaveOk' || name == 'slave_ok')
      serverOptions.slave_ok = (value == 'true');
    if (name == 'poolSize')
      serverOptions.poolSize = Number(value);
    if (name == 'autoReconnect' || name == 'auto_reconnect')
      serverOptions.auto_reconnect = (value == 'true');
    if (name == 'ssl' || name == 'ssl')
      serverOptions.ssl = (value == 'true');

    // ReplSet options:
    if (name == 'replicaSet' || name == 'rs_name')
      replSetServersOptions.rs_name = value;
    if (name == 'reconnectWait')
      replSetServersOptions.reconnectWait = Number(value);
    if (name == 'retries')
      replSetServersOptions.retries = Number(value);
    if (name == 'readSecondary' || name == 'read_secondary')
      replSetServersOptions.read_secondary = (value == 'true');

    // DB options:
    if (name == 'safe')
      dbOptions.safe = (value == 'true');
    // Not supported by Db: safe, w, wtimeoutMS, fsync, journal, connectTimeoutMS, socketTimeoutMS
    if (name == 'nativeParser' || name == 'native_parser')
      dbOptions.native_parser = (value == 'true');
    if (name == 'strict')
      dbOptions.strict = (value == 'true');
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