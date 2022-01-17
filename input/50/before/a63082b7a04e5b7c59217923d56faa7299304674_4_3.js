function close(){
    if(socketOpen){
      serverHttp.close();
    }
  }