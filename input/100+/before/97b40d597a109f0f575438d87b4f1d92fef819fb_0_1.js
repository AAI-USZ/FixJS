function(){
    this.socket = new MozWebSocket("ws://" + host + ":" + port);
    this.socket.onopen = function (){
      // XXX hack, give other handlers time to register
      setTimeout(function(){
        if(node.onopen)
          node.onopen();
      }, 250);
    };
    this.socket.onclose   = function (){
      if(node.onclose)
        node.onclose();
    };
    this.socket.onmessage = function (e){
      msg = new JRMessage(e.data);
      if(node.onmessage)
        node.onmessage(msg);
    };
  }