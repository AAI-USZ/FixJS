function(options) {
  var localMetaData = {};
  if(options.extraData !== undefined && options.extraData != null) {
    localMetaData["customData"] = options.extraData;
  } else if(extraData !== undefined && extraData != null) {
    localMetaData["customData"] = extraData;
  }
  
  if(localMetaData["customData"] !== undefined && localMetaData["customData"] != null) {
    var metaDataKeys = Object.keys(localMetaData["customData"]);
    for(var key in metaDataKeys) {
      if(filters.indexOf(key) != -1) {
        localMetaData[key] = undefined;
      }
    }
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
    localMetaData["request"] = requestHash;
  }

  return localMetaData;
}