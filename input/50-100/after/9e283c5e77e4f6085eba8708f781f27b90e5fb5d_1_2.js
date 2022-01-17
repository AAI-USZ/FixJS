function(name){
      if(client.chans[name.toLowerCase()] !== undefined){
        delete client.chans[name.toLowerCase()];
      }
    }