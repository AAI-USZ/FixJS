function () {
  if (!check()) {
    // let the probe timeout
    return;
  }

  // instrument websocketjs logging
  function log (type) {
    return function () {
      var str = Array.prototype.join.call(arguments, ' ');
      // debug: [websocketjs %s] %s, type, str
    }
  };

  WEB_SOCKET_LOGGER = { log: log('debug'), error: log('error') };
  WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;

  // dependencies
  var deps = [path + 'web_socket.js'];

  if ('undefined' == typeof swfobject) {
    deps.unshift(path + 'swfobject.js');
  }

  load(deps, function () {
    FlashWS.prototype.doOpen.call(self);
  });
}