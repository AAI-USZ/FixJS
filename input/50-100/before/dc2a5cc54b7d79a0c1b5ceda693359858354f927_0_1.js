function(msg){
      if(msg['id'] == id){
        success = msg['result'];
        if(success && this.onsuccess)
          this.onsuccess(msg['result']);
        else if(!success && this.onfailed)
          this.onfailed(msg['error']['code'], msg['error']['message']);
      }
    }