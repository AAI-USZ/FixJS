function toggleLog(logpath, port) {
    if(!isLoggingHttp[port]){
      isLoggingHttp[port] = true;
      file.mkdir('http', port, logpath);
    }
    else{
      isLoggingHttp[port] = false;
      if(httpBuffer){
        //write the file
        writeFile(logpath, port);
      }
    }
  }