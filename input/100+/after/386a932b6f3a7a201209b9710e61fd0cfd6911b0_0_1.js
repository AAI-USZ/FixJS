function(){
      var windowProto = window.__proto__;
      windowProto._events = self._events;
      ['on', 'off', 'emit', 'once'].forEach(function(key){
        windowProto[key] = EventEmitter.prototype[key];
      });
      window.frame = frame;
      window.emit('ready');
    }