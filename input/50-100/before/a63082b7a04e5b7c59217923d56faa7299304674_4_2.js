function toggleLog(logpath) {
    if(!isLoggingHttp){
      isLoggingHttp = true;
      file.mkdir('http', currentHttpPort, logpath);
    }
    else{
      isLoggingHttp = false;
      if(httpBuffer){
        //write the file
        writeFile(logpath);
      }
    }
  }