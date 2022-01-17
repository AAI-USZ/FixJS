function onmessage(msg){
      var result = {};
      msg = decode(msg);

      if (msg && msg.type && appjs.events[msg.type]) {
        var listeners = appjs.events[msg.type];
        var temp;
        for (var i=0; i < listeners.length; i++) {
          temp = listeners[i].call(appjs, msg.msg, result);
          if (temp != null) {
            result = temp;
          }
        }
      }
      return encode(result);
    }