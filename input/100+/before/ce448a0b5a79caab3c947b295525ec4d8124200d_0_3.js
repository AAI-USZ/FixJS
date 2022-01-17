function(){
    id = guid();
    rpc_method = arguments[0];
    args = [];
    for(a = 1; a < arguments.length; a++){
      if(getObjectClass(arguments[a]) == "JRObject")
        args.push(arguments[a].to_json());
      else
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
          if(JRObject.is_jrobject(result))
            result = JRObject.from_json(result);
          this.onsuccess(result);
        }
        else if(!success && this.onfailed)
          this.onfailed(msg['error']['code'], msg['error']['message']);
      }else{
        if(msg['method'] && this.invoke_callback){
          params = msg['params'];
          for(i=0;i<params.length;++i)
            if(JRObject.is_jrobject(params[i]))
              params[i] = JRObject.from_json(params[i]);
          this.invoke_callback(msg['method'], params);
        }
      }
    };
    this.socket.send($.toJSON(request));
  }