function(msg){
      if(node.message_received)
        node.message_received(msg);
      if(msg['id'] == id){
        success = !msg['error'];
        if(success && node.onsuccess){
          result = msg['result'];
          node.onsuccess(result);
        }
        else if(!success && node.onfailed)
          node.onfailed(msg['error']['code'], msg['error']['message']);
      }else{
        if(msg['method'] && node.invoke_callback){
          params = msg['params'];
          node.invoke_callback(msg['method'], params);
        }
      }
    }