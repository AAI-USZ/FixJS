function () {
  if (!this.check()) {
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
  WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;

  if ('undefined' == typeof WEB_SOCKET_SWF_LOCATION) {
    WEB_SOCKET_SWF_LOCATION = this.flashPath + 'WebSocketMainInsecure.swf';
  }

  // dependencies
  var deps = [this.flashPath + 'web_socket.js'];

  if ('undefined' == typeof swfobject) {
    deps.unshift(this.flashPath + 'swfobject.js');
  }

  var self = this;

  load(deps, function () {
    self.ready(function () {
      WebSocket.__addTask(function () {
        WS.prototype.doOpen.call(self);
      });
    });
  });
}