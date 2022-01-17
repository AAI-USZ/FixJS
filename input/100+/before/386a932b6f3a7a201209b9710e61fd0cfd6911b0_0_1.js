function(){
      var windowProto = window.__proto__;
      windowProto._events = self._events;
      ['on', 'off', 'emit', 'once'].forEach(function(key){
        windowProto[key] = EventEmitter.prototype[key];
      });
      window.console.open = function open(){ nativeWindow.openDevTools() };
      window.console.close = function close(){ nativeWindow.closeDevTools() };
      window.frame = frame;
      window.emit('ready');
    }