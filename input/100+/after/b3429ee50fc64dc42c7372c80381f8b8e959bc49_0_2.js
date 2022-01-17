function WSNode (host, port){
  var node = this;
  this.open = function(){
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
  };
  this.invoke_request = function(){
    id = guid();
    rpc_method = arguments[0];
    args = [];
    for(a = 1; a < arguments.length; a++){
        args.push(arguments[a]);
    }
    request = {jsonrpc:  '2.0',
               method: rpc_method,
               params: args,
               id: id};
    this.onmessage = function(msg){
      if(this.message_received)
        this.message_received(msg);
      if(msg['id'] == id){
        success = !msg['error'];
        if(success && this.onsuccess){
          result = msg['result'];
          this.onsuccess(result);
        }
        else if(!success && this.onfailed)
          this.onfailed(msg['error']['code'], msg['error']['message']);
      }else{
        if(msg['method'] && this.invoke_callback){
          params = msg['params'];
          this.invoke_callback(msg['method'], params);
        }
      }
    };
    this.socket.send($.toJSON(request));
  };
  this.close = function(){
    this.socket.close();
  };
}