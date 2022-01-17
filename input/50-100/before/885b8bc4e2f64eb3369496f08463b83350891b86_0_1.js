function(msg){
      if(msg['id'] == id){
        success = msg['result'];
        if(success && this.onsuccess){
          result = msg['result'];
          if(JRObject.is_jrobject(result))
            result = JRObject.from_json(result);
          this.onsuccess(result);
        }
        else if(!success && this.onfailed)
          this.onfailed(msg['error']['code'], msg['error']['message']);
      }
    }