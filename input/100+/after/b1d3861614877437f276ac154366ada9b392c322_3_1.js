function(opt) {
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
  }