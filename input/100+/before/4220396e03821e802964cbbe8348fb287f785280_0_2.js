function(options) {
  var localExtraData = null;
  if(options.extraData !== undefined && options.extraData != null) {
    localExtraData = options.extraData;
  } else if(extraData !== undefined && extraData != null) {
    localExtraData = extraData;
  } else {
    localExtraData = {};
  }
  
  if(options.req !== undefined && options.req != null) {
    var requestHash = {};
    requestHash["url"] = options.req.url;
    requestHash["method"] = options.req.method;
    requestHash["headers"] = options.req.headers;
    requestHash["httpVersion"] = options.req.httpVersion;
    
    var connectionHash = {}
    connectionHash["remoteAddress"] = options.req.connection.remoteAddress;
    connectionHash["remotePort"] = options.req.connection.remotePort;
    connectionHash["bytesRead"] = options.req.connection.bytesRead;
    connectionHash["bytesWritten"] = options.req.connection.bytesWritten;
    connectionHash["localPort"] = options.req.connection.address()["port"];
    connectionHash["localAddress"] = options.req.connection.address()["address"];
    connectionHash["IPVersion"] = options.req.connection.address()["family"];
    
    requestHash["connection"] = connectionHash;
    extraData["request"] = requestHash;
  }
  
  var extraDataKeys = Object.keys(extraData);
  for(var key in extraDataKeys) {
    if(filters.indexOf(key) != -1) {
      extraData[key] = undefined;
    }
  }
  
  return extraData;
}