function writeFile(logpath, port){
    file.writeFile('http', httpBuffer, port, logpath, function(){ httpBuffer = ''; });
  }