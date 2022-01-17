function close(port){
    if(socketOpen[port]){
      serverHttp[port].close();
    }
  }