function close(port){
    if(socketOpen[port]){
      try{
        serverHttp[port].close();
      } 
      catch(e){
        console.log('critical error: ', e);
      }
    }
  }