function(){
    node.socket = new MozWebSocket("ws://" + host + ":" + port);
    node.socket.onopen = function (){
      // XXX hack, give other handlers time to register
      setTimeout(function(){
        if(node.onopen)
          node.onopen();
      }, 250);
    };
    node.socket.onclose   = function (){
      if(node.onclose)
        node.onclose();
    };
    node.socket.onmessage = function (e){
      msg = new JRMessage(e.data);
      if(node.onmessage)
        node.onmessage(msg);
    };
  }