function onmessage(msg){
      var res = {};
      msg = decode(msg);

      if (msg && msg.type && appjs.events[msg.type]) {
        var listeners = appjs.events[msg.type];
        for (var i=0; i < listeners.length; i++) {
          listeners[i].call(appjs, msg.msg, res);
        }
      }
      return encode(res.result === undefined ? {} : res.result);
    }