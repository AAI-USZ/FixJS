function writeFile(logpath){
    file.writeFile('http', httpBuffer, currentHttpPort, logpath, function(){httpBuffer = '';});
  }